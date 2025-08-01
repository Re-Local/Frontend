import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { feature } from 'topojson-client';

const Foodmap = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);

  useEffect(() => {
    const loadScript = () =>
      new Promise((resolve, reject) => {
        const existing = document.querySelector('script[src^="https://dapi.kakao.com"]');
        if (existing) return resolve();

        const script = document.createElement('script');
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=039270177862ec2c7c46e905b6d3352f&autoload=false';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Kakao script load error'));
        document.head.appendChild(script);
      });

    let goBackButton = null;

    loadScript().then(() => {
      window.kakao.maps.load(async () => {
        if (!mapRef.current) return;

        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 9,
        });

        const seoulMap = await (await fetch('/seoul.geojson')).json();
        const dongDataRaw = await (await fetch('/seoul_districts_topo.json')).json();
        const dongData = feature(dongDataRaw, dongDataRaw.objects.admdong_seoul_codeEdit_1);

        const customOverlay = new window.kakao.maps.CustomOverlay({});
        const infowindow = new window.kakao.maps.InfoWindow({ removable: true });

        const centers = [/* 생략, 위 코드에서 그대로 붙여 넣기 가능 */];

        let regionPolygons = [];
        let dongPolygons = [];

        const displayDongAreas = (dongGeo) => {
          dongGeo.forEach((dong) => {
            const geometry = dong.geometry;
            const drawPolygon = (coords) => {
              const path = coords.map(([lng, lat]) => new window.kakao.maps.LatLng(lat, lng));
              const polygon = new window.kakao.maps.Polygon({
                map,
                path,
                strokeWeight: 2,
                strokeColor: '#5C5B5C',
                strokeOpacity: 0.8,
                fillColor: '#CACACB',
                fillOpacity: 0.7,
              });
              dongPolygons.push(polygon);
              addDongEvents(polygon, dong);
            };

            if (geometry.type === 'Polygon') drawPolygon(geometry.coordinates[0]);
            else if (geometry.type === 'MultiPolygon') geometry.coordinates.forEach((multi) => drawPolygon(multi[0]));
          });
        };

        const addDongEvents = (polygon, dong) => {
          window.kakao.maps.event.addListener(polygon, 'mouseover', (e) => {
            polygon.setOptions({ fillColor: '#b29ddb' });
            customOverlay.setPosition(e.latLng);
            customOverlay.setMap(map);
          });

          window.kakao.maps.event.addListener(polygon, 'mouseout', () => {
            polygon.setOptions({ fillColor: '#CACACB' });
            customOverlay.setMap(null);
          });

          window.kakao.maps.event.addListener(polygon, 'click', (e) => {
            const content = document.createElement('div');
            content.innerHTML = `
              <div style="padding:8px; font-size:13px;">
                <strong>${dong.properties.DONG_KOR_NM}</strong><br />
                이 지역 맛집을 보시겠어요?<br/><br/>
                <button id="btn-goto" style="background:#B36B00;color:white;padding:4px 8px;border-radius:5px;">맛집 보기</button>
              </div>`;
            infowindow.setContent(content);
            infowindow.setPosition(e.latLng);
            infowindow.setMap(map);

            content.querySelector('#btn-goto')?.addEventListener('click', () => {
              navigate('/restaurant');
            });
            addGoBackButton();
          });
        };

        const displayArea = (coords, name) => {
          const path = coords.map(([lng, lat]) => new window.kakao.maps.LatLng(lat, lng));
          const polygon = new window.kakao.maps.Polygon({
            map,
            path,
            strokeWeight: 2,
            strokeColor: '#004c80',
            strokeOpacity: 0.8,
            fillColor: '#ffffff',
            fillOpacity: 0.6,
          });

          regionPolygons.push(polygon);

          window.kakao.maps.event.addListener(polygon, 'mouseover', (e) => {
            polygon.setOptions({ fillColor: '#d2c7ef' });
            customOverlay.setPosition(e.latLng);
            customOverlay.setMap(map);
          });

          window.kakao.maps.event.addListener(polygon, 'mouseout', () => {
            polygon.setOptions({ fillColor: '#ffffff' });
            customOverlay.setMap(null);
          });

          window.kakao.maps.event.addListener(polygon, 'click', () => {
            regionPolygons.forEach((p) => p.setMap(null));
            regionPolygons = [];

            const center = centers.find((c) => c.name === name);
            if (center) map.setCenter(new window.kakao.maps.LatLng(center.lat, center.lng));
            map.setLevel(7);

            const dongs = dongData.features.filter((f) => f.properties.SIG_KOR_NM === name);
            displayDongAreas(dongs);
            addGoBackButton();
          });
        };

        const addGoBackButton = () => {
          if (goBackButton) return;
          goBackButton = document.createElement('button');
          goBackButton.innerText = '구 다시 선택하기';
          goBackButton.style.cssText =
            'position:absolute;top:20px;right:40px;background:#B36B00;color:white;padding:10px 16px;border-radius:8px;z-index:100;';
          goBackButton.onclick = () => resetRegions();
          document.body.appendChild(goBackButton);
        };

        const resetRegions = () => {
          dongPolygons.forEach((p) => p.setMap(null));
          dongPolygons = [];
          infowindow.close();

          map.setLevel(9);
          map.setCenter(new window.kakao.maps.LatLng(37.5665, 126.9780));
          if (goBackButton) {
            goBackButton.remove();
            goBackButton = null;
          }

          seoulMap.features.forEach((f) => {
            displayArea(f.geometry.coordinates[0], f.properties.SIG_KOR_NM);
          });
        };

        seoulMap.features.forEach((f) => {
          displayArea(f.geometry.coordinates[0], f.properties.SIG_KOR_NM);
        });
      });
    });

    return () => {
      if (goBackButton) goBackButton.remove();
    };
  }, [navigate]);

  return (
    <div className="map-wrapper" style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>우리 지역 근처 맛집 찾기</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '1rem' }}>
        서울시에서 원하는 구역을 선택하세요.
      </p>
      <div
        className="map-container"
        style={{
          width: '100%',
          maxWidth: '1000px',
          height: '600px',
          margin: '0 auto',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid #eee',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default Foodmap;

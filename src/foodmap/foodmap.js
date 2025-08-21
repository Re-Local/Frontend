import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from '../components/Topnav';
<<<<<<< Updated upstream
import './Foodmap.css';

=======
import './foodmap.css';
import axios from 'axios';
>>>>>>> Stashed changes
// @ts-ignore
import { feature } from 'topojson-client';

const Foodmap = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);

  // 백엔드 연동을 위한 상태
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // 지도 인스턴스 저장
  const [mapInstance, setMapInstance] = useState(null);

  // 사용자 UI용 데이터
  const popularAreas = ['Gangnam', 'Hongdae', 'Myeongdong', 'Insadong'];

  // 백엔드에서 공연 정보 가져오기
  const fetchPerformances = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('https://re-local.onrender.com/api/movies');
      setPerformances(response.data.items || []);
    } catch (err) {
      console.error('공연 정보 가져오기 실패:', err);
      setError('공연 정보를 불러올 수 없습니다.');
      setPerformances([]);
    } finally {
      setLoading(false);
    }
  };

  // 공연 마커를 지도에 추가하는 함수
  const addPerformanceMarkers = () => {
    if (!performances || performances.length === 0 || !mapInstance) return;

             performances.forEach((performance) => {
           if (performance.lat && performance.lng) {
             const marker = new window.kakao.maps.Marker({
               position: new window.kakao.maps.LatLng(performance.lat, performance.lng),
               map: mapInstance
             });

             // 마커 호버 효과
             window.kakao.maps.event.addListener(marker, 'mouseover', () => {
               marker.setZIndex(1000);
             });
             
             window.kakao.maps.event.addListener(marker, 'mouseout', () => {
               marker.setZIndex(1);
             });

                          // 마커 클릭 시 정보창 표시
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `
              <div style="padding:24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-width:340px; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius:20px; box-shadow: 0 12px 40px rgba(102, 126, 234, 0.25); color:white; position:relative; overflow:hidden;">
                <!-- 배경 장식 요소 -->
                <div style="position:absolute; top:-20px; right:-20px; width:80px; height:80px; background:rgba(255,255,255,0.1); border-radius:50%;"></div>
                <div style="position:absolute; bottom:-30px; left:-30px; width:60px; height:60px; background:rgba(255,255,255,0.08); border-radius:50%;"></div>
                
                <div style="position:relative; z-index:2;">
                  <!-- 제목과 카테고리 -->
                  <div style="margin-bottom:20px;">
                    <h3 style="margin:0 0 12px 0; color:white; font-size:20px; font-weight:700; line-height:1.3; text-shadow:0 2px 4px rgba(0,0,0,0.1);">${performance.title}</h3>
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
                      <span style="background:rgba(255,255,255,0.2); color:white; padding:6px 14px; border-radius:25px; font-size:12px; font-weight:600; backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.3);">${performance.category}</span>
                      <span style="color:rgba(255,255,255,0.9); font-size:13px; font-weight:500;">${performance.duration}분</span>
                    </div>
                  </div>
                  
                  <!-- 정보 섹션 -->
                  <div style="margin-bottom:24px; background:rgba(255,255,255,0.1); padding:16px; border-radius:16px; backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.2);">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                      <div style="width:8px; height:8px; background:#FFD700; border-radius:50%;"></div>
                      <span style="color:rgba(255,255,255,0.95); font-size:14px; font-weight:500;">${performance.location}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                      <div style="width:8px; height:8px; background:#FF6B6B; border-radius:50%;"></div>
                      <span style="color:rgba(255,255,255,0.95); font-size:14px; font-weight:500;">${performance.start_date} ~ ${performance.end_date}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:10px;">
                      <div style="width:8px; height:8px; background:#4ECDC4; border-radius:50%;"></div>
                      <span style="color:#FFD700; font-size:18px; font-weight:700; text-shadow:0 2px 4px rgba(0,0,0,0.2);">₩${performance.price?.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <!-- 버튼 섹션 -->
                  <div style="display:flex; gap:10px;">
                    <button id="btn-details" style="flex:1; background:linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color:#2C3E50; padding:14px 18px; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; transition:all 0.3s; box-shadow:0 4px 15px rgba(255, 215, 0, 0.3); text-shadow:0 1px 2px rgba(0,0,0,0.1);">🎭 상세보기</button>
                    <button id="btn-close" style="background:rgba(255,255,255,0.2); color:white; padding:14px 18px; border:none; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer; transition:all 0.3s; backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.3);">✕ 닫기</button>
                  </div>
                </div>
              </div>
            `
          });

                                   window.kakao.maps.event.addListener(marker, 'click', () => {
            infowindow.open(mapInstance, marker);
            
            // 지도 클릭 시 정보창 닫기 이벤트 추가
            const closeInfoWindowOnMapClick = () => {
              infowindow.close();
              // 이벤트 리스너 제거
              window.kakao.maps.event.removeListener(mapInstance, 'click', closeInfoWindowOnMapClick);
            };
            
            // 지도 클릭 이벤트 리스너 추가
            window.kakao.maps.event.addListener(mapInstance, 'click', closeInfoWindowOnMapClick);
            
            // 버튼 이벤트 추가 - DOM이 준비될 때까지 대기
            const addButtonEvents = () => {
              const btnDetails = document.querySelector('#btn-details');
              const btnClose = document.querySelector('#btn-close');
              
              if (btnDetails && btnClose) {
                // 상세보기 버튼 이벤트
                btnDetails.addEventListener('click', () => {
                  // 해당 공연을 강조 표시
                  const performanceElement = document.querySelector(`[data-performance-id="${performance.movie_id}"]`);
                  if (performanceElement) {
                    performanceElement.scrollIntoView({ behavior: 'smooth' });
                    performanceElement.style.boxShadow = '0 0 20px rgba(52, 152, 219, 0.3)';
                    setTimeout(() => {
                      performanceElement.style.boxShadow = '';
                    }, 2000);
                  }
                  infowindow.close();
                  // 지도 클릭 이벤트 리스너 제거
                  window.kakao.maps.event.removeListener(mapInstance, 'click', closeInfoWindowOnMapClick);
                });
                
                // 닫기 버튼 이벤트
                btnClose.addEventListener('click', () => {
                  infowindow.close();
                  // 지도 클릭 이벤트 리스너 제거
                  window.kakao.maps.event.removeListener(mapInstance, 'click', closeInfoWindowOnMapClick);
                });
                
                return true; // 성공적으로 이벤트 추가됨
              }
              return false; // 아직 DOM이 준비되지 않음
            };
            
            // DOM이 준비될 때까지 반복 시도
            const tryAddEvents = () => {
              if (!addButtonEvents()) {
                setTimeout(tryAddEvents, 50); // 50ms마다 재시도
              }
            };
            
            tryAddEvents();
            
            // ESC 키로도 정보창 닫기
            const closeOnEscape = (e) => {
              if (e.key === 'Escape') {
                infowindow.close();
                window.kakao.maps.event.removeListener(mapInstance, 'click', closeInfoWindowOnMapClick);
                document.removeEventListener('keydown', closeOnEscape);
              }
            };
            document.addEventListener('keydown', closeOnEscape);
            
            // 정보창이 닫힐 때 이벤트 리스너 정리
            const originalClose = infowindow.close;
            infowindow.close = function() {
              originalClose.call(this);
              window.kakao.maps.event.removeListener(mapInstance, 'click', closeInfoWindowOnMapClick);
              document.removeEventListener('keydown', closeOnEscape);
            };
          });
      }
    });
  };

  // 컴포넌트 마운트 시 공연 정보 가져오기
  useEffect(() => {
    fetchPerformances();
  }, []);

  // performances가 변경될 때마다 마커 다시 그리기
  useEffect(() => {
    if (performances.length > 0 && mapInstance) {
      addPerformanceMarkers();
    }
  }, [performances, mapInstance]);

  useEffect(() => {
    const loadScript = () =>
      new Promise((resolve, reject) => {
        // 이미 로드된 스크립트가 있는지 확인
        if (window.kakao && window.kakao.maps) {
          return resolve();
        }
        
        const existing = document.querySelector('script[src^="https://dapi.kakao.com"]');
        if (existing) {
          // 기존 스크립트가 있지만 아직 로드되지 않은 경우
          const checkKakao = () => {
            if (window.kakao && window.kakao.maps) {
              resolve();
            } else {
              setTimeout(checkKakao, 100);
            }
          };
          checkKakao();
          return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=039270177862ec2c7c46e905b6d3352f&autoload=false';
        script.async = true;
        script.onload = () => {
          // 스크립트 로드 후 kakao 객체가 준비될 때까지 대기
          const checkKakao = () => {
            if (window.kakao && window.kakao.maps) {
              resolve();
            } else {
              setTimeout(checkKakao, 100);
            }
          };
          checkKakao();
        };
        script.onerror = () => reject(new Error('Failed to load Kakao Maps SDK'));
        document.head.appendChild(script);
      });

    let goBackButton = null;

    const initializeMap = async () => {
      try {
        await loadScript();
        
        // Kakao Maps SDK가 로드되었는지 확인
        if (typeof window.kakao === 'undefined' || !window.kakao.maps) {
          throw new Error('Kakao Maps SDK failed to load properly.');
        }

        // Load Kakao Maps with timeout
        try {
          await Promise.race([
            window.kakao.maps.load(),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Kakao Maps load timeout')), 10000)
            )
          ]);
        } catch (loadError) {
          throw new Error(`Failed to initialize Kakao Maps: ${loadError.message}`);
        }
        
        if (!mapRef.current) return;

        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 9,
        });
        setMapInstance(map);

        // 지도 데이터 로딩
        const [seoulMap, dongDataRaw] = await Promise.all([
          fetch('/seoul.geojson').then(res => res.json()),
          fetch('/seoul_districts_topo.json').then(res => res.json())
        ]);

        const dongData = feature(dongDataRaw, dongDataRaw.objects.admdong_seoul_codeEdit_1);

        const customOverlay = new window.kakao.maps.CustomOverlay({});
        const infowindow = new window.kakao.maps.InfoWindow({ removable: true });

        const centers = [
          { name: 'Gangnam', lat: 37.4979, lng: 127.0276 },
          { name: 'Hongdae', lat: 37.5572, lng: 126.9244 },
          { name: 'Myeongdong', lat: 37.5636, lng: 126.982 },
          { name: 'Insadong', lat: 37.5740, lng: 126.9850 },
        ];

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
            else if (geometry.type === 'MultiPolygon')
              geometry.coordinates.forEach((multi) => drawPolygon(multi[0]));
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
               <div style="padding:24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-width:300px; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius:20px; box-shadow: 0 12px 40px rgba(102, 126, 234, 0.25); color:white; position:relative; overflow:hidden;">
                 <!-- 배경 장식 요소 -->
                 <div style="position:absolute; top:-20px; right:-20px; width:80px; height:80px; background:rgba(255,255,255,0.1); border-radius:50%;"></div>
                 <div style="position:absolute; bottom:-30px; left:-30px; width:60px; height:60px; background:rgba(255,255,255,0.08); border-radius:50%;"></div>
                 
                 <div style="position:relative; z-index:2;">
                   <div style="margin-bottom:20px;">
                     <h3 style="margin:0 0 12px 0; color:white; font-size:20px; font-weight:700; line-height:1.3; text-shadow:0 2px 4px rgba(0,0,0,0.1);">${dong.properties.DONG_KOR_NM}</h3>
                     <p style="margin:0; color:rgba(255,255,255,0.9); font-size:15px; line-height:1.5; font-weight:400;">이 지역의 공연 및 문화 정보를 확인해보세요</p>
                   </div>
                   <div style="display:flex; gap:10px;">
                     <button id="btn-performances" style="flex:1; background:linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color:#2C3E50; padding:14px 18px; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; transition:all 0.3s; box-shadow:0 4px 15px rgba(255, 215, 0, 0.3); text-shadow:0 1px 2px rgba(0,0,0,0.1);">🎭 공연 보기</button>
                     <button id="btn-close" style="background:rgba(255,255,255,0.2); color:white; padding:14px 18px; border:none; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer; transition:all 0.3s; backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.3);">✕ 닫기</button>
                   </div>
                 </div>
               </div>`;
             
             // 버튼 스타일 개선
             const style = document.createElement('style');
             style.textContent = `
               #btn-performances:hover { 
                 background: linear-gradient(135deg, #FFA500 0%, #FF8C00 100%) !important; 
                 transform: translateY(-2px) !important;
                 box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4) !important;
               }
               #btn-close:hover { 
                 background: rgba(255,255,255,0.3) !important; 
                 transform: translateY(-2px) !important;
               }
             `;
             content.appendChild(style);
             
             infowindow.setContent(content);
             infowindow.setPosition(e.latLng);
             infowindow.setMap(map);
             
             // 공연 보기 버튼 클릭 이벤트
             content.querySelector('#btn-performances')?.addEventListener('click', () => {
               // 해당 지역의 공연만 필터링하여 표시
               const filteredPerformances = performances.filter(p => 
                 p.location && p.location.includes(dong.properties.DONG_KOR_NM)
               );
               if (filteredPerformances.length > 0) {
                 // 공연 목록을 강조 표시
                 document.querySelector('.found-experiences').scrollIntoView({ behavior: 'smooth' });
               }
               infowindow.close();
             });
             
             // 닫기 버튼 클릭 이벤트
             content.querySelector('#btn-close')?.addEventListener('click', () => {
               infowindow.close();
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
            if (center)
              map.setCenter(new window.kakao.maps.LatLng(center.lat, center.lng));
            map.setLevel(7);
            const dongs = dongData.features.filter(
              (f) => f.properties.SIG_KOR_NM === name,
            );
            displayDongAreas(dongs);
            addGoBackButton();
          });
        };

                                   const addGoBackButton = () => {
            if (goBackButton) return;
            goBackButton = document.createElement('button');
            goBackButton.innerText = '← 구 다시 선택하기';
            goBackButton.style.cssText =
              'position:absolute;top:20px;right:20px;background:#4A90E2;color:white;padding:12px 20px;border:none;border-radius:10px;z-index:100;font-size:14px;font-weight:500;cursor:pointer;box-shadow:0 2px 8px rgba(74,144,226,0.3);transition:all 0.2s;';
            goBackButton.onmouseover = () => {
              goBackButton.style.background = '#357ABD';
              goBackButton.style.transform = 'translateY(-1px)';
            };
            goBackButton.onmouseout = () => {
              goBackButton.style.background = '#4A90E2';
              goBackButton.style.transform = 'translateY(0)';
            };
            goBackButton.onclick = () => resetRegions();
            // 지도 컨테이너에 버튼 추가 (document.body 대신)
            mapRef.current.appendChild(goBackButton);
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

        // 공연 마커 추가
        addPerformanceMarkers();
        
      } catch (err) {
        console.error('Map initialization error:', err);
        // 에러가 발생해도 지도는 표시되도록 함
      }
    };

    initializeMap();

    return () => {
      if (goBackButton) goBackButton.remove();
    };
  }, [navigate, performances]);

  return (
    <div className="map-page">
      <Topnav />

      <div className="map-header-text">
        <h2>Map</h2>
        <p>Please select your desired district in Seoul.</p>
      </div>

      <div className="map-content">
        <aside className="map-filter">
          <h4>Search & Filter</h4>
          <input type="text" placeholder="Search experiences or location..." />
          <select>
            <option>All Categories</option>
            <option>Musical</option>
            <option>Play</option>
            <option>Exhibition</option>
          </select>
          <select>
            <option>All Locations</option>
            <option>Seoul</option>
            <option>Incheon</option>
          </select>
          <button className="apply-btn">Apply Filters</button>

          <div className="popular-areas">
            <h4>Popular Areas</h4>
            <ul>
              {popularAreas.map((a, i) => (
                <li key={i}>📍 {a}</li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="map-container-wrapper">
          <div ref={mapRef} className="map-container" />
        </div>
      </div>


    </div>
  );
};

export default Foodmap;
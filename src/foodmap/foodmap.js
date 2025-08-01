import './foodmap.css';
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Foodmap = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const loadScript = () => {
            return new Promise((resolve, reject) => {
                const existingScript = document.querySelector('script[src^="https://dapi.kakao.com"]');
                if (existingScript) {
                    resolve(); // 이미 있으면 바로 resolve
                    return;
                }

                const script = document.createElement("script");
                script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=50d60c48f372a7f105505d4140b8f96d&autoload=false";
                script.async = true;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error("Kakao script load error"));
                document.head.appendChild(script);
            });
        };

        const initMap = async () => {
            console.log("👉 Kakao map script ready");
            window.kakao.maps.load(async () => {
                console.log("✅ Kakao maps loaded");

                // fetch JSON
                const geojson = await fetch('/seoul.geojson').then(res => res.json());
                const districtsJson = await fetch('/seoul_districts.geojson').then(res => res.json());
                const centerData = await fetch('/seoul_districts_topo.json').then(res => res.json());

                const mapContainer = document.getElementById("politic-map");
                if (!mapContainer) {
                    console.error("❌ Map container not found");
                    return;
                }

                const map = new window.kakao.maps.Map(mapContainer, {
                    center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
                    level: 9,
                });

                console.log("🗺 Map created:", map);
                // 👉 여기부터 displayArea / displayDongAreas 등 넣기
            });
        };

        loadScript().then(initMap).catch(console.error);
    }, [navigate]);

    return (
        <div>
            <h1>우리 지역 근처 맛집 찾기</h1>
            <div id="politic-map" style={{ width: '100%', height: '600px' }}></div>
        </div>
    );
};

export default Foodmap;

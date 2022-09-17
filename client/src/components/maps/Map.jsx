import React, { useEffect } from 'react';
import styled from 'styled-components';

function Map() {
  const newScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', () => {
        resolve();
      });
      script.addEventListener('error', (e) => {
        reject(e);
      });
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    // 카카오맵 스크립트 읽어오기
    const myScript = newScript(
      `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.REACT_APP_JAVASCRIPT_KEY}`,
    );

    // 스크립트 읽기 완료 후 카카오맵 설정
    myScript.then(() => {
      console.log('script loaded!!!');
      const { kakao } = window;
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.56000302825312, 126.97540593203321), // 좌표설정
          level: 3,
        };
        const map = new kakao.maps.Map(mapContainer, options); // 맵생성
        // 마커설정
        const markerPosition = new kakao.maps.LatLng(
          37.56000302825312,
          126.97540593203321,
        );
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    });
  }, []);
  return (
    <div>
      <MapContainer id="map" />
    </div>
  );
}

export default Map;

const MapContainer = styled.div`
  width: 350px;
  height: 400px;
  border: 1px solid black;
`;

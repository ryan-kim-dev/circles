import React from 'react';

function KakaoAuth() {
  const code = new URL(window.location.href).searchParams.get('code');
  return <div>{code}</div>;
}

export default KakaoAuth;

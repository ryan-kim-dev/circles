import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './PostListStyles';

// * react-query 미사용 로직
/* 
1. useEffect 내부에서 axios get 요청
2. jsx 리턴문에서 map 메서드로 응답 데이터를 화면에 렌더링
*/

function PostList() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get('/api/images')
      .then((response) => setImages(response.data))
      .catch((err) => console.log(`${err}`));
  }, []);

  const postlists = images.map((image) => {
    return (
      <S.PostListItem key={image.key}>
        {/* src가 서버의 이미지 파일 저장 폴더로 접근하는 경로 */}
        <img src={`http://localhost:5000/uploads/${image.key}`} alt="#" />
      </S.PostListItem>
    );
  });

  return <S.PostLists>{postlists}</S.PostLists>;
}

export default PostList;

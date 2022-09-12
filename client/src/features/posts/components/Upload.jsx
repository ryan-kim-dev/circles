import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { addPost } from '../../../apis/postApi';
// import axios from 'axios';
// import { toast } from 'react-toastify';
import * as S from './UploadStyles';

function Upload() {
  const queryClient = useQueryClient();
  const addPostMutation = useMutation(addPost, {
    onSuccess: () => {
      // 캐시 무효화하고 다시 Fetch
      queryClient.invalidateQueries('posts');
    },
  });

  const navigate = useNavigate();

  const defaultFileName = '이미지 파일을 업로드 해주세요';
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [fileName, setFileName] = useState(defaultFileName);

  const imgSelectHandler = (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    setFileName(imageFile.name);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = (event) => setImgSrc(event.target.result);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    addPostMutation.mutate(formData);
    return navigate('/');
  };

  return (
    <S.UploadPageLayout>
      <S.UploadForm action="" onSubmit={onSubmit}>
        <S.PrevImgBox>
          <img src={imgSrc} alt="upload-preview" className={imgSrc && 'show'} />
        </S.PrevImgBox>
        <S.FileDropperBox>
          <label htmlFor="image">{fileName}</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={imgSelectHandler}
          />
        </S.FileDropperBox>
        <S.SubmitBtn type="submit">제출</S.SubmitBtn>
      </S.UploadForm>
    </S.UploadPageLayout>
  );
}

export default Upload;

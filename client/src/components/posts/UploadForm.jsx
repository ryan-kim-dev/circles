/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FormLayout,
  FormContainer,
  FormPrevImgBox,
  FormWrapper,
  FormDropperBox,
  FormSubmitBtn,
} from './UploadStyles';

function Upload() {
  const navigate = useNavigate();

  const defaultFileName = '이미지 파일을 업로드 해주세요';
  const [files, setFiles] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [fileName, setFileName] = useState(defaultFileName);

  const imgSelectHandler = (e) => {
    const imageFiles = e.target.files;
    setFiles(imageFiles);
    const imageFile = imageFiles[0];
    setFileName(imageFile.name);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = (event) => setImgSrc(event.target.result);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // 요청 본문에서 파일 형식을 form-data로 하므로 append only. -> .append(key, value)
    const formData = new FormData();
    for (const file of files) formData.append('image', file);

    try {
      const res = await axios.post('/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('업로드 완료');
      setTimeout(() => {
        setFileName(defaultFileName);
        setImgSrc(null);
      }, 3000);
      console.log(res);
      navigate('/');
    } catch (err) {
      toast.error(err.message);
      setFileName(defaultFileName);
      setImgSrc(null);
    }
  };

  return (
    <FormLayout>
      <FormContainer>
        <FormWrapper action="" onSubmit={onSubmit}>
          <FormPrevImgBox>
            <img
              src={imgSrc}
              alt="upload-preview"
              className={imgSrc && 'show'}
            />
          </FormPrevImgBox>
          <FormDropperBox>
            <label htmlFor="image">{fileName}</label>
            <input
              id="image"
              type="file"
              multiple
              accept="image/*"
              onChange={imgSelectHandler}
            />
          </FormDropperBox>
          <FormSubmitBtn type="submit">제출</FormSubmitBtn>
        </FormWrapper>
      </FormContainer>
    </FormLayout>
  );
}

export default Upload;

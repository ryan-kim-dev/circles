import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProgressBar from './ProgressBar';

const Upload = () => {
  const defaultFileName = '이미지 파일을 업로드 해주세요';
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [fileName, setFileName] = useState(defaultFileName);
  const [persent, setPersent] = useState('0%');

  const imgSelectHandler = e => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    setFileName(imageFile.name);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = e => setImgSrc(e.target.result);
  };
  const onSubmit = async e => {
    e.preventDefault();
    // 요청 본문에서 파일 형식을 form-data로 하므로 append only. -> .append(key, value)
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: e => {
          setPersent(`${Math.round((100 * e.loaded) / e.total)}%`);
        },
      });
      toast.success('업로드 완료');
      setTimeout(() => {
        setPersent('0%');
        setFileName(defaultFileName);
        setImgSrc(null);
      }, 3000);
      console.log(res);
    } catch (err) {
      toast.error(err.message);
      setPersent('0%');
      setFileName(defaultFileName);
      setImgSrc(null);
    }
  };

  return (
    <Form action="" onSubmit={onSubmit}>
      <PrevImgBox>
        <img src={imgSrc} alt="upload-preview" className={imgSrc && 'show'} />
      </PrevImgBox>
      <ProgressBar persent={persent} />
      <FileDropper>
        <label htmlFor="image">{fileName}</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={imgSelectHandler}
        />
      </FileDropper>
      <SubmitBtn type="submit">제출</SubmitBtn>
    </Form>
  );
};

export default Upload;

const Form = styled.form``;

const PrevImgBox = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  img {
    border-radius: 10px;
    width: 0%;
    opacity: 0;

    &.show {
      opacity: 1;
      width: 50%;
      transition: 0.5s;
    }
  }
`;

const FileDropper = styled.div`
  border: 1px solid #000000;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  :hover {
    background-color: #bebebe;
    transition: 0.5s;
    color: #fff;
  }

  input {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  border: none;
  height: 40px;
  background-color: lightgray;
  cursor: pointer;

  :hover {
    background-color: skyblue;
    color: #fff;
    transition: 0.2s;
    border: 2px solid #fff;
  }
`;

import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('이미지 파일을 업로드 해주세요');

  const onChange = e => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    setFileName(imageFile.name);
    // console.log(imageFile);
  };
  const onSubmit = async e => {
    e.preventDefault();
    // 요청 본문에서 파일 형식을 form-data로 하므로 append only. -> .append(key, value)
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log({ res });
      toast.success('업로드 완료');
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <Container>
      <Form action="" onSubmit={onSubmit}>
        <FileDropper>
          <label htmlFor="image">{fileName}</label>
          <input id="image" type="file" onChange={onChange} />
        </FileDropper>
        <SubmitBtn type="submit">제출</SubmitBtn>
      </Form>
    </Container>
  );
};

export default Upload;

const Container = styled.div``;

const Form = styled.form``;

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

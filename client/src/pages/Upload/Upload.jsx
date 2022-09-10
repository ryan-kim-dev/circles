import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProgressBar from '../../components/ProgressBar';
import * as S from './UploadStyles';

function Upload() {
  const navigate = useNavigate();

  const defaultFileName = '이미지 파일을 업로드 해주세요';
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [fileName, setFileName] = useState(defaultFileName);
  const [persent, setPersent] = useState('0%');

  const imgSelectHandler = (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    setFileName(imageFile.name);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = (event) => setImgSrc(event.target.result);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // 요청 본문에서 파일 형식을 form-data로 하므로 append only. -> .append(key, value)
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          setPersent(`${Math.round((100 * event.loaded) / event.total)}%`);
        },
      });
      toast.success('업로드 완료');
      setTimeout(() => {
        setPersent('0%');
        setFileName(defaultFileName);
        setImgSrc(null);
      }, 3000);
      console.log(res);
      navigate('/');
    } catch (err) {
      toast.error(err.message);
      setPersent('0%');
      setFileName(defaultFileName);
      setImgSrc(null);
    }
  };

  return (
    <S.UploadPageLayout>
      <S.UploadForm action="" onSubmit={onSubmit}>
        <S.PrevImgBox>
          <img src={imgSrc} alt="upload-preview" className={imgSrc && 'show'} />
        </S.PrevImgBox>
        <ProgressBar persent={persent} />
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

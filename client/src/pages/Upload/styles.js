import styled from 'styled-components';

export const UploadPageLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const UploadForm = styled.form``;

export const PrevImgBox = styled.div`
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

export const FileDropperBox = styled.div`
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

export const SubmitBtn = styled.button`
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

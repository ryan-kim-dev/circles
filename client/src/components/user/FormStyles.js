import styled from 'styled-components';
import { Button } from '../../GlobalStyle';

export const FormLayout = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  @media screen and (max-width: 479px) {
    height: 90vh;
  }
`;

export const FormContainer = styled.div`
  color: black;
  border: 1px solid #1d3561;
  width: 400px;
  height: 650px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 479px) {
    width: 300px;
    height: 600px;
  }
`;

export const FormLogoBox = styled.div`
  width: 100%;
  height: 300px;
  padding: 20px;
  /* border: 1px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* line-height: 70px; */
  @media screen and (max-width: 479px) {
  }
`;

export const FormLogoImg = styled.img`
  width: 100px;
  @media screen and (max-width: 479px) {
    width: 50%;
  }
`;

export const FormTitle = styled.h1`
  margin-top: 5%;
  font-size: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormWrapper = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
`;

export const FormRow = styled.div``;

export const FormLabelText = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #1d3561;
`;

export const FormInput = styled.input`
  margin-top: 3px;
  width: 250px;
  height: 23px;
  border: 1px solid #1d3561;
`;

export const FormSubmitBtn = styled(Button)`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 40px;
  font-size: 13px;
  color: #fff;
`;

export const FormIsUserSpan = styled.span`
  font-size: 12px;
  color: gray;
`;

export const FormLoginBtn = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 18px;
  font-weight: bold;
`;

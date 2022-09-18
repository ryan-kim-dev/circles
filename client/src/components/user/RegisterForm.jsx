import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  FormLayout,
  FormContainer,
  FormLogoBox,
  FormLogoImg,
  FormTitle,
  FormWrapper,
  FormRow,
  FormLabelText,
  FormInput,
  FormSubmitBtn,
  FormLoginBtn,
  FormIsUserSpan,
} from './FormStyles';
import Logo from '../../assets/android-chrome-512x512.png';
import { signUpUser } from '../../redux/userSlice';

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userInfo, setuserInfo] = useState({
    email: '',
    username: '',
    password: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setuserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUpUser(userInfo))
      .then((res) => {
        if (res.payload.success === true) return navigate('/login');
        return alert('잘못된 입력입니다');
      })
      .catch((err) => alert(`${err}`));
  };

  return (
    <FormLayout>
      <FormContainer>
        <FormLogoBox>
          <FormLogoImg src={Logo} alt="logo" />
        </FormLogoBox>
        <FormTitle>회원가입</FormTitle>
        <FormWrapper onChange={onChange} onSubmit={onSubmit}>
          <FormRow>
            <FormLabelText>메일주소</FormLabelText>
            <FormInput type="email" id="email" name="email" />
          </FormRow>
          <FormRow>
            <FormLabelText>닉네임</FormLabelText>
            <FormInput type="text" id="id" name="username" />
          </FormRow>
          <FormRow>
            <FormLabelText>비밀번호</FormLabelText>
            <FormInput type="password" id="password" name="password" />
          </FormRow>
          <FormSubmitBtn type="submit" big>
            회원 가입 하기
          </FormSubmitBtn>
          <FormIsUserSpan>회원이신가요?</FormIsUserSpan>
          <FormLoginBtn type="button" onClick={() => navigate('/login')}>
            로그인 하기
          </FormLoginBtn>
        </FormWrapper>
      </FormContainer>
    </FormLayout>
  );
}

export default RegisterForm;

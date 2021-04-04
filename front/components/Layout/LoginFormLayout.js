import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import GoogleLoginButton from '../Oauth/GoogleLogin';
import {
  StLoginFormTitle,
  StSingupTextButton,
  StHr,
} from '../../style/LoginForm';
import CreateAccountInfoForm from '../From/Login/CreateAccountInfoForm';
import CreateAccountNicknameForm from '../From/Login/CreateAccountNicknameForm';
import MusicBoxLoginForm from '../From/Login/MusicBoxLoginForm';

const LoginFormLayout = () => {
  const { loginPopupOrder } = useSelector((state) => state.user);
  const [nickname, setNickname] = useState('');

  return (
    <div>
      {loginPopupOrder === 0 && (
      <>
        <StLoginFormTitle>Login MusicBox</StLoginFormTitle>
        <div>
          <GoogleLoginButton setNickname={setNickname} />
        </div>
        <StHr />
        <MusicBoxLoginForm />
        <Link href="/signup"><StSingupTextButton>Create Account</StSingupTextButton></Link>
      </>
      )}
      {loginPopupOrder === 2 && <CreateAccountInfoForm />}
      {loginPopupOrder === 3 && (
        <CreateAccountNicknameForm
          nickname={nickname}
          setNickname={setNickname}
        />
      )}
    </div>
  );
};
export default LoginFormLayout;

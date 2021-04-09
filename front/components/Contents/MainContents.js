import Router from 'next/router';
import React, { useCallback } from 'react';
import {
  StHomeArea,
  StHomeContent,
  StLoginButton,
  StLp,
  StWave,
} from '../../style/components/DefaultHomeLayout';

const MainContents = () => {
  const onClickLoginButton = useCallback(() => {
    Router.push('/login');
  }, []);

  return (
    <>
      <StHomeArea>
        <StLp>
          <StWave>
            <div /><div />
            <div /><div />
            <div /><div />
          </StWave>
        </StLp>
        <StHomeContent>
          <strong>Please Sign in</strong>
          <p>로그인후 사용해 주세요.</p>
          <StLoginButton type="button" onClick={onClickLoginButton}>Log In</StLoginButton>
        </StHomeContent>
      </StHomeArea>
    </>
  );
};

export default MainContents;
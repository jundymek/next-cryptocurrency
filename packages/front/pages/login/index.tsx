import React, { useEffect, useState } from 'react';
import LoginForm from '../../components/loginForm/LoginForm';
import RegisterForm from '../../components/registerForm/RegisterForm';
import styled from 'styled-components';
import { useRouter } from 'next/router';

interface Props {
  isRegisterOpen: boolean;
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const InnerContainer = styled.div<Props>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${(props) => (props.isRegisterOpen ? 'rotateY(180deg)' : 'none')};
`;

const LoginWrapper = styled.div`
  position: absolute;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
`;

const RegisterWrapper = styled.div`
  position: absolute;
  width: 100%;
  /* min-height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  transform: rotateY(-180deg);
`;

const Login = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsRegisterOpen(router.query.isRegisterOpen == 'true');
  }, [router.query]);

  const handleFlip = () => {
    setIsRegisterOpen((prevState) => !prevState);
  };
  return (
    <Container className="bg-black">
      <InnerContainer isRegisterOpen={isRegisterOpen}>
        <LoginWrapper className="bg-black">
          <LoginForm handleFlip={handleFlip} />
        </LoginWrapper>
        <RegisterWrapper>
          <RegisterForm handleFlip={handleFlip} />
        </RegisterWrapper>
      </InnerContainer>
    </Container>
  );
};

export default Login;

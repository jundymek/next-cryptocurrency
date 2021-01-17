import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import LoginForm from '../../components/loginForm/LoginForm';
import RegisterForm from '../../components/registerForm/RegisterForm';
import styled from 'styled-components';

interface Props {
  isRegisterOpen: boolean;
}

const Container = styled.div`
  background-color: transparent;
`;

const InnerContainer = styled.div<Props>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${(props) => (props.isRegisterOpen ? 'rotateY(180deg)' : 'none')};
`;

const LoginWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
`;

const RegisterWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  transform: rotateY(-180deg);
`;

const Login = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleFlip = () => {
    setIsRegisterOpen((prevState) => !prevState);
  };
  return (
    <Layout title="Login page">
      <Container>
        <InnerContainer isRegisterOpen={isRegisterOpen}>
          <LoginWrapper>
            <LoginForm handleFlip={handleFlip} />
          </LoginWrapper>
          <RegisterWrapper>
            <RegisterForm handleFlip={handleFlip} />
          </RegisterWrapper>
        </InnerContainer>
      </Container>
    </Layout>
  );
};

export default Login;

import React from 'react';
import styled from 'styled-components';
import LoginLogout from '../header/LoginLogout';

interface MenuProps {
  isMobileMenuOpen: boolean;
}

const StyledMenu = styled.nav<MenuProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: ${({ isMobileMenuOpen }) =>
    isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)'};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;

  @media (min-width: 576px) {
    display: none;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const MobileMenu = React.memo(({ isMobileMenuOpen }: MenuProps) => {
  return (
    <StyledMenu isMobileMenuOpen={isMobileMenuOpen} className="z-20 sm:hidden bg-gray-900">
      <LoginLogout />
    </StyledMenu>
  );
});

export default MobileMenu;

import React from 'react';
import styled from 'styled-components';

interface HamburgerProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledBurger = styled.button<Partial<HamburgerProps>>`
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  position: fixed;
  top: 50px;
  right: 20px;
  z-index: 100;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ isMobileMenuOpen }) => (isMobileMenuOpen ? '#e37a29' : '#EFFFFA')};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ isMobileMenuOpen }) => (isMobileMenuOpen ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ isMobileMenuOpen }) => (isMobileMenuOpen ? '0' : '1')};
      transform: ${({ isMobileMenuOpen }) =>
        isMobileMenuOpen ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ isMobileMenuOpen }) => (isMobileMenuOpen ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const Hamburger = React.memo(({ isMobileMenuOpen, setIsMobileMenuOpen }: HamburgerProps) => {
  return (
    <StyledBurger
      isMobileMenuOpen={isMobileMenuOpen}
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="flex sm:hidden text-yellow-600 z-30"
    >
      <div />
      <div />
      <div />
    </StyledBurger>
  );
});

export default Hamburger;

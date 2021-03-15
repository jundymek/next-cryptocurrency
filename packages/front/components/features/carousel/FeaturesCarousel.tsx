import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styled from 'styled-components';

interface FeaturesCarouselProps {
  children: React.ReactNode;
}

interface ButtonProps {
  currentNumber: number;
  active: boolean;
}

const InnerButton = styled.div<ButtonProps>`
  transition: max-height 500ms;
  height: 6px;
  max-height: ${(props) => (props.active ? '6px' : '1px')};
  width: 30px;
  transition: all 0.2s;
  background: ${(props) =>
    props.active
      ? 'linear-gradient(90deg, rgb(106, 17, 203) 0%, rgb(37, 117, 252) 100%)'
      : 'linear-gradient(90deg, rgb(226, 226, 226) 0%, rgb(33, 112, 152) 100%)'};
`;

const StyledButton = styled.button`
  margin: 20px 2px;
  padding: 10px 0;
  position: relative;
  &:hover ${InnerButton} {
    width: 34px;
    max-width: 34px;
  }
`;

const FeaturesCarousel = React.memo<FeaturesCarouselProps>(({ children }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const CustomDot = ({ index, onClick, active }: any) => {
    return (
      <StyledButton
        onClick={(e) => {
          onClick();
          e.preventDefault();
        }}
      >
        <InnerButton currentNumber={index} active={active}></InnerButton>
      </StyledButton>
    );
  };

  return (
    <Carousel
      responsive={responsive}
      className="sm:w-2/3 mx-auto py-10"
      draggable={true}
      showDots
      customDot={<CustomDot />}
      removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
    >
      {children}
    </Carousel>
  );
});

export default FeaturesCarousel;

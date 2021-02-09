import React, { useState } from 'react';

import styled from 'styled-components';
import Feature from './Feature';

interface WrapperProps {
  visibleFeature: number;
}
interface ButtonProps extends WrapperProps {
  currentNumber: number;
}

const Wrapper = styled.div<WrapperProps>`
  min-width: 100vw;
  overflow: hidden;
  transition-duration: 0.2s;
  transform: translateX(
    ${(props) => (props.visibleFeature == 0 ? 100 : 100 - props.visibleFeature * 100)}vw
  );
`;

const InnerButton = styled.div<ButtonProps>`
  transition: max-height 500ms;
  height: 6px;
  max-height: ${(props) => (props.visibleFeature === props.currentNumber ? '6px' : '1px')};
  width: 30px;
  background: ${(props) =>
    props.visibleFeature === props.currentNumber
      ? 'linear-gradient(90deg, rgb(106, 17, 203) 0%, rgb(37, 117, 252) 100%)'
      : 'linear-gradient(90deg, rgb(226, 226, 226) 0%, rgb(33, 112, 152) 100%)'};

  &:hover {
    width: 30px;
    max-width: 30px;
  }
`;

const StyledButton = styled.button<ButtonProps>`
  margin: 0 2px;
  padding: 10px 0;
  position: relative;
  &:hover ${InnerButton} {
    width: 30px;
    max-width: 30px;
  }
`;

const Features = () => {
  const [visibleFeature, setvisibleFeature] = useState(0);

  const handleClick = (feature: number) => {
    console.log(feature);
    setvisibleFeature(feature);
  };

  return (
    <section className="clipped bg-black text-gray-100 h-full sm:my-10">
      <div className="flex flex-col items-center justify-center container mx-auto relative overflow-x-hidden">
        {/* <div className="mx-auto overflow-hidden"> */}
        <Wrapper className="flex" visibleFeature={visibleFeature}>
          <Feature
            title="The world's most popular Bitcoin & cryptocurrency portfolio tracker. Now with trading."
            text="Track your portfolio, get Blockfolio Signal updates from top teams, and buy and sell
          crypto with zero fees."
          />
          <Feature
            title="Connect to Blockfolio with your favorite messaging apps"
            text="Automatically receive the latest real-time Blockfolio Signal updates and pricing straight
              to your Slack groups"
          />
          <Feature
            title="3 feature"
            text="Automatically receive the latest real-time Blockfolio Signal updates and pricing straight
              to your Slack groups"
          />
        </Wrapper>
        {/* </div> */}
        <div className="py-10">
          <StyledButton
            className=""
            currentNumber={0}
            visibleFeature={visibleFeature}
            onClick={() => handleClick(0)}
          >
            <InnerButton currentNumber={0} visibleFeature={visibleFeature}></InnerButton>
          </StyledButton>
          <StyledButton
            className=""
            currentNumber={1}
            visibleFeature={visibleFeature}
            onClick={() => handleClick(1)}
          >
            <InnerButton currentNumber={1} visibleFeature={visibleFeature}></InnerButton>
          </StyledButton>
          <StyledButton
            className=""
            currentNumber={2}
            visibleFeature={visibleFeature}
            onClick={() => handleClick(2)}
          >
            <InnerButton currentNumber={2} visibleFeature={visibleFeature}></InnerButton>
          </StyledButton>
        </div>
      </div>
    </section>
  );
};

export default Features;

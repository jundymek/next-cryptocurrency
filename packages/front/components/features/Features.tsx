import React, { useEffect, useLayoutEffect, useState } from 'react';
import Feature1 from './Feature1';
import Feature2 from './Feature2';

import styled from 'styled-components';
import Feature from './Feature';

interface WrapperProps {
  visibleFeature: number;
}

const Wrapper = styled.div<WrapperProps>`
  min-width: 200vw;
  overflow: hidden;
  transition-duration: 0.2s;
  transform: translateX(
    ${(props) => (props.visibleFeature === 1 ? 0 : -props.visibleFeature * 50)}vw
  );
`;

const Features = () => {
  const [visibleFeature, setvisibleFeature] = useState(0);

  const handleClick = (feature: number) => {
    console.log(feature);
    setvisibleFeature(feature);
  };

  return (
    <section className="clipped bg-gray-800 text-white h-96">
      <div className="flex flex-col items-center justify-center container mx-auto relative z-10 overflow-hidden">
        <div className="mx-auto overflow-hidden">
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
          </Wrapper>
        </div>
        <div className="mt-6">
          <button className="mx-2" onClick={() => handleClick(1)}>
            First
          </button>
          |
          <button className="mx-2" onClick={() => handleClick(2)}>
            Second
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;

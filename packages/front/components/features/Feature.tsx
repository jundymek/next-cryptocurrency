import React from 'react';
import styled from 'styled-components';

interface FeatureProps {
  title: string;
  text: string;
}

const StyledDiv = styled.div`
  scroll-snap-align: center;
`;

const Feature = ({ title, text }: FeatureProps) => {
  return (
    <StyledDiv className="flex flex-col  justify-center items-center my-4">
      <div className="p-4  sm:w-1/2 relative">
        <span className="absolute top-0 left-4 uppercase mb-2 text-sm text-gray-400">
          Key features
        </span>
        <h2 className="font-bold text-2xl sm:text-5xl tracking-wide pt-2">{title}</h2>
        <p className="my-4 text-gray-400 text-md sm:text-2xl">{text}</p>
      </div>
    </StyledDiv>
  );
};

export default Feature;

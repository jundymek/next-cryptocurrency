import React from 'react';
import Image from 'next/image';
import { ClippedSection } from '../shared/styledComponents/ClippedSection';
// @ts-ignore
import bgImage from '../../assets/bg_circle.svg';

const About = () => {
  return (
    <ClippedSection className="bg-gray-900 text-white h-full relative pb-10" bgImage={bgImage}>
      <div className="container mx-auto relative overflow-hidden">
        <div className="sm:w-1/2 px-2 mx-auto flex flex-col items-center justify-center">
          <h3 className="text-2xl my-4 text-blue-500">Why and by who</h3>
          <blockquote className="sm:text-xl text-center py-4 text-gray-200">
            "Why this project? I like practical tasks. Why this project? I like practical tasks. Why
            this project? I like practical tasks. Why this project? I like practical tasks. Why this
            project? I like practical tasks. Why this project? I like practical tasks. Why this
            project? I like practical tasks. Why this project? I like practical tasks."
          </blockquote>
          <Image src="/me_robot.png" alt="Me robot" width="200" height="200" />
        </div>
      </div>
    </ClippedSection>
  );
};

export default About;

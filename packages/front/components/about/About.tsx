import React from 'react';
import Image from 'next/image';
import { ClippedSection } from '../shared/styledComponents/ClippedSection';
// @ts-ignore
import bgImage from '../../assets/bg_circle.svg';

const About = () => {
  return (
    <ClippedSection className="bg-gray-700 text-white h-full relative pb-10" bgImage={bgImage}>
      <div className="container mx-auto relative overflow-hidden">
        <div className="sm:w-1/2 px-2 mx-auto flex flex-col items-center justify-center">
          <h3 className="text-2xl my-4 text-blue-500">Few words about...</h3>
          <blockquote className="sm:text-xl text-gray-400 text-center py-4 tracking-widest sm:leading-loose">
            "Why did I create this project? I like practical tasks and I am interested in
            cryptocurrences world. Every portfolio app is full of redundant options and I thought
            that I could write my own simple portfolio app. And here it is. As simple as possible
            but fulfilling its role. <span className="text-yellow-500 font-bold">Enjoy it</span>."
          </blockquote>
          <div className="flex items-center">
            <Image
              src="/me_robot.png"
              alt="Me robot"
              width="64px"
              height="64px"
              className="rounded-full w-16 h-16"
            />
            <div className="px-6">
              <p className="text-lg font-bold tracking-widest ">jundymek</p>
              <p className="text-gray-400 text-sm">Frontend developer</p>
            </div>
          </div>
        </div>
      </div>
    </ClippedSection>
  );
};

export default About;

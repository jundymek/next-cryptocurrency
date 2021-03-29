import React from 'react';
import { Icon } from '@iconify/react';
import githubIcon from '@iconify/icons-codicon/github';
import linkedinIcon from '@iconify/icons-et/linkedin';
// @ts-ignore
import logo from '../../assets/logo1.svg';

const Footer = () => {
  return (
    <footer className="h-64 w-screen bg-black py-8">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center h-full px-8">
        <img src={logo} alt="Logo" className="max-w-12 max-h-12" />
        <p className="text-gray-500">
          made with passion by{' '}
          <a
            href="http://jundymek.com/"
            className="underline text-yellow-500 hover:text-yellow-700 duration-300"
          >
            jundymek
          </a>
        </p>
        <div className="flex">
          <a href="https://github.com/jundymek">
            <Icon
              icon={githubIcon}
              className="text-4xl text-gray-500 mx-1 hover:text-yellow-500 duration-300"
            />
          </a>
          <a href="https://www.linkedin.com/in/lukasz-dymek/">
            <Icon
              icon={linkedinIcon}
              className="text-4xl text-gray-500 mx-1 hover:text-yellow-500 duration-300"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

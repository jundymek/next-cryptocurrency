import React, { ReactNode } from 'react';
import Head from 'next/head';
import { OptionsProvider } from '../../context/optionsContext';
import Header from '../header/Header';

interface LayoutProps {
  readonly children: ReactNode;
  readonly title: string;
}

const Layout = React.memo<LayoutProps>(({ children, title }) => {
  return (
    <OptionsProvider>
      <div className=" mx-auto relative h-screen">
        <Head>
          <title>{title}</title>
        </Head>
        <Header />
        <main className="transform sm:-skew-y-6 z-0 sm:-mt-48">{children}</main>
      </div>
    </OptionsProvider>
  );
});

export default Layout;

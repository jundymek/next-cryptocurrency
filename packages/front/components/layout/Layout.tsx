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
      <div className="container mx-auto relative h-screen">
        <Head>
          <title>{title}</title>
        </Head>
        <Header />
        <main>{children}</main>
      </div>
    </OptionsProvider>
  );
});

export default Layout;

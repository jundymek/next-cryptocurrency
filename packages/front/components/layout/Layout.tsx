import React, { ReactNode } from 'react';
import Head from 'next/head';
import { OptionsProvider } from '../../context/optionsContext';
import Header from '../header/Header';
import Footer from '../footer/Footer';

interface LayoutProps {
  readonly children: ReactNode;
  readonly title: string;
}

const Layout = React.memo<LayoutProps>(({ children, title }) => {
  return (
    <OptionsProvider>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="mx-auto relative min-h-screen">
        <Header />
        <main className="transform sm:-skew-y-6 sm:-mt-48  min-h-screen bg-blue-200">
          {children}
        </main>
        <Footer />
      </div>
    </OptionsProvider>
  );
});

export default Layout;

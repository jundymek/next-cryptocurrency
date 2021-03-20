import React, { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import MobileMenu from '../mobileMenu/MobileMenu';
import Hamburger from '../mobileMenu/Hamburger';
import { useWindowWidth } from '../../customHooks/useWindowWidth';

interface LayoutProps {
  readonly children: ReactNode;
  readonly title: string;
}

const Layout = React.memo<LayoutProps>(({ children, title }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth > 640) {
      setIsMobileMenuOpen(false);
    }
  }, [windowWidth]);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="mx-auto relative font-raleway">
        <Hamburger isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <MobileMenu isMobileMenuOpen={isMobileMenuOpen} />
        <Header />
        {!isMobileMenuOpen && (
          <>
            <main className="">{children}</main>
            <Footer />
          </>
        )}
      </div>
    </>
  );
});

export default Layout;

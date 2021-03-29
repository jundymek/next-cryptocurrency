import { useEffect, useState } from 'react';

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(0);

  if (typeof window !== 'undefined') {
    useEffect(() => {
      setWindowWidth(window.innerWidth);
    }, []);

    useEffect(() => {
      function handleResize() {
        setWindowWidth(window.innerWidth);
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [window.innerWidth]);
  }

  return windowWidth;
}

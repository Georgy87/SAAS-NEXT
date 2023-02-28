import { useEffect, useState } from 'react';

type SizeData = {
  width: number;
  height: number;
};

export const useWindowSize = (): SizeData => {
  const [size, setSize] = useState<SizeData>({
    width: global.innerWidth,
    height: global.innerHeight,
  });

  const resizeHanlder = () => {
    const width: number = window?.innerWidth;
    const height: number = window?.innerHeight;

    setSize({
      width,
      height,
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') { 
      window.addEventListener('resize', resizeHanlder);
    }
   
    return () => {
      window.removeEventListener('resize', resizeHanlder);
    };
  }, [size]);

  useEffect(() => {
    resizeHanlder();
  }, []);
  return {
    width: size.width,
    height: size.height,
  };
};

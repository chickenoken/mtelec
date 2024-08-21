'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const NProgress = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="5px"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default NProgress;
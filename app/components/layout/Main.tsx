import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Main: React.FC<Props> = ({ children }) => {
  return (
    <main className='bg-blueMain flex flex-col flex-grow min-h-screen items-center relative mt-header md:ml-slotsWidth overflow-hidden pt-4 lg:pt-8 pb-10'>
      {children}
    </main>
  );
};

export default Main;

'use client';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const CollapsibleContentBlockConainer: React.FC<Props> = ({ children }) => {
  return <div className='my-4'>{children}</div>;
};

export default CollapsibleContentBlockConainer;

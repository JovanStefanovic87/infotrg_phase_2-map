import React from 'react';
import Link from 'next/link';

interface CallToActionButtonProps {
  label: string;
  href: string;
}

const CallToActionButton: React.FC<CallToActionButtonProps> = ({ label, href }) => {
  return (
    <Link href={href}>
      <span
        className={`px-6 py-3 font-semibold text-white rounded-md shadow-md shadow-blue hover:shadow-blueLightest transition duration-300 cursor-pointer bg-hyperlink hover:opacity-85 active:opacity-70 tracking-widest`}
      >
        {label}
      </span>
    </Link>
  );
};

export default CallToActionButton;

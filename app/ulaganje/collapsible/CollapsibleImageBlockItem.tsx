import React from 'react';
import Image from 'next/image';

interface Props {
  img: string;
  title: string;
  imgIndex: number;
  openModal: (image: string, title: string) => void;
}

const CollapsibleImageBlockItem: React.FC<Props> = ({ img, title, imgIndex, openModal }) => {
  return (
    <div
      key={imgIndex}
      className='relative w-full my-4 cursor-pointer'
      onClick={() => openModal(img, title)}
    >
      <Image
        src={img}
        alt={`${title}-${imgIndex}`}
        sizes='100vw'
        className='rounded-md shadow-md'
        width={720}
        height={480}
      />
    </div>
  );
};

export default CollapsibleImageBlockItem;

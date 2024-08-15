import Image from 'next/image';
import styles from '../../styles.module.css';

interface Props {
  image: string;
  imgIndex: number;
  openImageModal: (image: string) => void;
}

const ImageBlockWithDescription: React.FC<Props> = ({ image, imgIndex, openImageModal }) => {
  return (
    <div key={imgIndex} className='relative flex items-center justify-center'>
      <div
        onClick={() => openImageModal(image)}
        className={`relative mt-4 flex items-center justify-center cursor-pointer transition duration-200 ease-in-out transform hover:scale-105 shadow-md ${styles.image_block} p-4`}
      >
        <Image
          src={image}
          alt={`Image ${imgIndex + 1}`}
          fill
          style={{ objectFit: 'contain' }}
          priority
          sizes='100%'
        />
      </div>
    </div>
  );
};

export default ImageBlockWithDescription;

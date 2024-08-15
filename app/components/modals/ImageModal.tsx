import Image from 'next/image';

type ImageModalProps = {
	src: string;
	alt: string;
	onClose: () => void;
};

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, onClose }) => {
	return (
		<div className='fixed inset-0 flex justify-center items-center z-50'>
			<div className='absolute inset-0 bg-black bg-opacity-75' onClick={onClose} />
			<div className='relative z-10'>
				<div className='relative border-4 border-blueLighter rounded-md overflow-hidden'>
					<Image
						src={src}
						alt={alt}
						height={0}
						width={0}
						sizes='(max-width: 768px) 100vw, (min-width: 769px) 50vw'
						style={{ width: '100%', height: 'auto' }}
						priority
						quality={100}
					/>
				</div>
			</div>
		</div>
	);
};

export default ImageModal;

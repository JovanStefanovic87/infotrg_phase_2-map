import Image from 'next/image';

interface Props {
	src: string;
	alt: string;
	openImageModal?: (image: string) => void;
	useModal?: boolean;
}

const CoverImage: React.FC<Props> = ({ src, alt = 'image', openImageModal, useModal }) => {
	const handleClick = () => {
		if (useModal && openImageModal) {
			openImageModal(src);
		}
	};

	return (
		<div
			className='flex items-center justify-center cursor-pointer transition duration-200 ease-in-out transform rounded-lg'
			onClick={handleClick}>
			<div className='relative mb-4 overflow-hidden w-72 h-60 md:w-96 md:h-64'>
				<Image src={src} alt={alt} fill style={{ objectFit: 'contain' }} priority sizes='100%' />
			</div>
		</div>
	);
};

export default CoverImage;

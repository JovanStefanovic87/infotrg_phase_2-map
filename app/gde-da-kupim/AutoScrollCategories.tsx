import React, { useEffect, useRef } from 'react';

interface Props {
	categories: { name: string }[];
}

const AutoScrollCategories: React.FC<Props> = ({ categories }) => {
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

	const startAutoScroll = () => {
		if (scrollContainerRef.current) {
			scrollIntervalRef.current = setInterval(() => {
				scrollContainerRef.current!.scrollBy({
					left: 1,
					behavior: 'smooth',
				});

				if (
					scrollContainerRef.current!.scrollLeft + scrollContainerRef.current!.clientWidth >=
					scrollContainerRef.current!.scrollWidth
				) {
					stopAutoScroll();
				}
			}, 20);
		}
	};

	const stopAutoScroll = () => {
		if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
	};

	useEffect(() => {
		startAutoScroll();

		return () => {
			stopAutoScroll();
		};
	}, []);

	return (
		<div className='flex items-center border-b-2 mb-2 '>
			<div
				ref={scrollContainerRef}
				className='flex items-center overflow-x-auto whitespace-nowrap text-gray-700 cursor-pointer py-3 rounded-lg transition-colors duration-300 custom-scrollbar'
				onMouseEnter={stopAutoScroll}
				onTouchStart={stopAutoScroll}
				/* onMouseLeave={() => !scrollEnded && startAutoScroll()} */
				style={{ width: '100%' }}>
				{categories.map((category, idx) => (
					<span key={idx} className='text-sm font-semibold text-gray-900 py-1 rounded-full'>
						{category.name}
						{idx < categories.length - 1 && <span className='text-gray-400 mx-1'>•</span>}
					</span>
				))}
				<span className='text-sm font-semibold text-gray-500 px-2'>...</span>
			</div>
		</div>
	);
};

export default AutoScrollCategories;

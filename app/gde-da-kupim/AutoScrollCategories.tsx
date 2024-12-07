import React, { useEffect, useRef } from 'react';

interface Props {
	categories: { name: string }[];
}

const AutoScrollCategories: React.FC<Props> = ({ categories }) => {
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const animationFrameRef = useRef<number | null>(null);
	const frameCounterRef = useRef(0);
	const scrollIncrement = 0.7; // Smaller value to slow down the scroll speed
	const frameSkip = 5; // Increase this number to slow down even more (e.g., scroll every 5th frame)

	const startAutoScroll = () => {
		if (scrollContainerRef.current) {
			const scrollStep = () => {
				// Only scroll every nth frame, where n is defined by `frameSkip`
				if (frameCounterRef.current % frameSkip === 0) {
					if (scrollContainerRef.current) {
						scrollContainerRef.current.scrollLeft += scrollIncrement;

						// Loop back to the start when reaching the end
						if (
							scrollContainerRef.current.scrollLeft + scrollContainerRef.current.clientWidth >=
							scrollContainerRef.current.scrollWidth - 1
						) {
							scrollContainerRef.current.scrollLeft = 0;
						}
					}
				}

				frameCounterRef.current += 1;
				animationFrameRef.current = requestAnimationFrame(scrollStep);
			};

			animationFrameRef.current = requestAnimationFrame(scrollStep);
		}
	};

	const stopAutoScroll = () => {
		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current);
		}
	};

	useEffect(() => {
		startAutoScroll();

		return () => {
			stopAutoScroll();
		};
	}, []);

	return (
		<div className='flex items-center border-b-2 mb-2'>
			<div
				ref={scrollContainerRef}
				className='flex items-center overflow-x-auto whitespace-nowrap text-gray-700 cursor-pointer py-3 rounded-lg transition-colors duration-300'
				onMouseEnter={stopAutoScroll}
				onTouchStart={stopAutoScroll}
				onMouseLeave={startAutoScroll}
				style={{ width: '100%' }}>
				{categories.map((category, id) => (
					<span key={id} className='text-sm font-semibold text-gray-900 py-1 rounded-full'>
						{category.name}
						{id < categories.length - 1 && <span className='text-gray-400 mx-1'>•</span>}
					</span>
				))}
				<span className='text-sm font-semibold text-gray-500 px-2'>...</span>
			</div>
		</div>
	);
};

export default AutoScrollCategories;

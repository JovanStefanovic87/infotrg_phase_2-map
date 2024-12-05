import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import DefaultButton from '@/app/components/buttons/DefaultButton';
import H1 from '@/app/components/text/H1';

interface Props {
	mainCategoryData: {
		icon: {
			url: string;
		};
		name: string;
	};
	locationText: string;
	openEditModal: () => void;
}

const CurrentSelectionPanel: React.FC<Props> = ({
	mainCategoryData,
	locationText,
	openEditModal,
}) => {
	const categoryScrollRef = useRef<HTMLDivElement | null>(null);
	const locationScrollRef = useRef<HTMLDivElement | null>(null);
	const isUserInteracting = useRef(false);

	const enableAutoScroll = (ref: React.RefObject<HTMLDivElement>, speed: number) => {
		if (!ref.current) return;

		let direction = 1; // 1 za desno, -1 za levo
		let isScrolling = true;

		const scroll = () => {
			if (!ref.current || !isScrolling || isUserInteracting.current) return;

			// Pomeranje skrolovanja
			ref.current.scrollLeft += direction * speed;

			// Provera da li smo dostigli kraj ili početak
			if (ref.current.scrollLeft + ref.current.clientWidth >= ref.current.scrollWidth) {
				direction = -1; // Promena smera u levo
			} else if (ref.current.scrollLeft <= 0) {
				isScrolling = false; // Zaustavljanje autoscroll-a
				return;
			}

			requestAnimationFrame(scroll);
		};

		// Početak autoscroll-a nakon kašnjenja
		const timeout = setTimeout(() => {
			requestAnimationFrame(scroll);
		}, 2000);

		// Povratna funkcija za čišćenje
		return () => {
			clearTimeout(timeout);
			isScrolling = false;
		};
	};

	const enableDragScroll = (ref: React.RefObject<HTMLDivElement>) => {
		let isDragging = false;
		let startX: number;
		let scrollLeft: number;

		const onMouseDown = (e: MouseEvent) => {
			if (!ref.current) return;
			isDragging = true;
			isUserInteracting.current = true; // Trajno zaustavi autoscroll
			startX = e.pageX - ref.current.offsetLeft;
			scrollLeft = ref.current.scrollLeft;
			ref.current.style.cursor = 'grabbing';
			ref.current.style.userSelect = 'none'; // Sprečava selektovanje teksta
		};

		const onMouseMove = (e: MouseEvent) => {
			if (!isDragging || !ref.current) return;
			const x = e.pageX - ref.current.offsetLeft;
			const walk = (x - startX) * 2; // Ubrzanje kretanja
			ref.current.scrollLeft = scrollLeft - walk;
		};

		const onMouseUp = () => {
			isDragging = false;
			if (ref.current) {
				ref.current.style.cursor = 'grab';
				ref.current.style.removeProperty('user-select');
			}
		};

		// Dodavanje događaja
		if (ref.current) {
			ref.current.addEventListener('mousedown', onMouseDown);
			ref.current.addEventListener('mousemove', onMouseMove);
			ref.current.addEventListener('mouseup', onMouseUp);
			ref.current.addEventListener('mouseleave', onMouseUp);
		}

		// Povratna funkcija za čišćenje
		return () => {
			if (ref.current) {
				ref.current.removeEventListener('mousedown', onMouseDown);
				ref.current.removeEventListener('mousemove', onMouseMove);
				ref.current.removeEventListener('mouseup', onMouseUp);
				ref.current.removeEventListener('mouseleave', onMouseUp);
			}
		};
	};

	useEffect(() => {
		const cleanupCategoryAutoScroll = enableAutoScroll(categoryScrollRef, 0.5);
		const cleanupLocationAutoScroll = enableAutoScroll(locationScrollRef, 0.5);
		const cleanupCategoryDragScroll = enableDragScroll(categoryScrollRef);
		const cleanupLocationDragScroll = enableDragScroll(locationScrollRef);

		return () => {
			cleanupCategoryAutoScroll?.();
			cleanupLocationAutoScroll?.();
			cleanupCategoryDragScroll();
			cleanupLocationDragScroll();
		};
	}, []);

	return (
		<div className='flex justify-start items-center gap-2 bg-yellowLogo rounded-lg w-full md:max-w-lg mx-auto relative shadow-inner shadow-black select-none min-h-32 pb-4'>
			<div className='relative flex-shrink-0 flex items-center justify-start pl-2 py-2'>
				<Image
					src={mainCategoryData.icon.url}
					alt={mainCategoryData.name}
					width={100}
					height={100}
					className='object-cover'
				/>
			</div>
			<div className='flex flex-col flex-grow justify-start h-full relative pr-2 overflow-auto'>
				{/* Autoscrolling H1 */}
				<div
					ref={categoryScrollRef}
					className='overflow-x-auto whitespace-nowrap uppercase flex-grow scrollbar-yellow'>
					<H1
						title={mainCategoryData.name}
						align='left'
						color='black'
						size='text-xl md:text-2xl'
						pb='0.5rem'
					/>
				</div>
				{/* Autoscrolling Location */}
				<div
					ref={locationScrollRef}
					className='overflow-x-auto whitespace-nowrap text-md text-black italic font-extrabold tracking-wide text-right flex-grow overflow-auto scrollbar-yellow'>
					<span>{locationText}</span>
				</div>
			</div>
			<div className='absolute -bottom-5 left-0 flex justify-center w-full'>
				<DefaultButton onClick={openEditModal} className='px-4 py-1.5 shadow-black shadow-md'>
					Izmeni
				</DefaultButton>
			</div>
		</div>
	);
};

export default CurrentSelectionPanel;

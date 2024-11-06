import React from 'react';

const SpinnerForContainers: React.FC = () => {
	return (
		<div className='relative flex justify-center items-center w-32 h-32'>
			<div className='absolute inset-0 border-4 border-solid border-black border-t-blueLightest rounded-full animate-spin bg-yellowLighter'></div>
			<span className='absolute inset-0 flex justify-center items-center right-7 top-3'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='60'
					height='150'
					viewBox='0 0 1167 2622'
					preserveAspectRatio='xMidYMid meet'
					style={{ shapeRendering: 'geometricPrecision' }}>
					<g transform='translate(0 2622) scale(0.1 -0.1)' fill='#000' stroke='none'>
						<path d='M10635 22104c-293-53-553-233-740-514-147-220-209-439-208-730 0-145 3-177 26-264 81-304 290-521 575-598 118-31 314-29 446 6 199 52 376 163 546 343 225 238 342 494 370 813 35 399-127 717-445 876-158 78-370 104-570 68z' />
						<path d='M9335 17163c-295-35-516-93-820-216-795-320-1507-832-2345-1684-248-252-430-446-430-459 1-8 481-384 502-392 4-2 124 108 265 244 461 442 774 723 970 871 181 135 410 236 570 249 196 16 276-74 259-290-17-208-21-224-249-971-1035-3387-1577-5637-1577-6545 0-141 18-286 46-380 97-326 327-533 655-591 92-16 269-16 373 0 330 52 802 259 1221 535 446 295 1089 832 1916 1600l206 191-21 24c-12 12-114 113-228 223l-208 200-127-119c-906-843-1514-1301-1756-1320-58-5-71-3-111 21-60 35-121 122-148 209-108 357 278 1994 1219 5162 384 1296 605 2093 699 2530 79 370 50 550-116 715-102 102-225 158-408 185-87 13-279 18-357 8z' />
					</g>
				</svg>
			</span>
		</div>
	);
};

export default SpinnerForContainers;

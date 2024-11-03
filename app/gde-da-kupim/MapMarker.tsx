import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface IconMarkerProps {
	index: number;
}

const MapMarker: React.FC<IconMarkerProps> = ({ index }) => {
	return (
		<div className='relative flex items-center justify-center'>
			<FaMapMarkerAlt size={48} color='#B91C1C' className='drop-shadow-md' />
			<span className='absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-sm bg-[#B91C1C] rounded-full w-8 h-8 flex items-center justify-center shadow-md'>
				{index + 1}
			</span>
		</div>
	);
};

export default MapMarker;

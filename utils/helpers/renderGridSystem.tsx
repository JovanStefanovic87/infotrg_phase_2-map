import React from 'react';
import Link from 'next/link';
import baseRenderGridSystem from './baseRenderGridSystem';
import { BasicInformation } from './types';

interface PropsWithLink {
	contentData: BasicInformation[];
	columns?: number;
	useLink?: boolean;
	children: (block: BasicInformation) => React.ReactNode;
	mapIdToPath?: (id: string) => string;
	useDevider?: boolean;
}

const renderGridSystem = ({
	contentData,
	columns = 1,
	useLink = true,
	useDevider,
	children,
	mapIdToPath = id => id,
}: PropsWithLink) => {
	const mapFunction = useLink ? (id: string) => mapIdToPath(id) : () => '#';

	return baseRenderGridSystem({
		contentData,
		columns,
		useDevider,
		children: (block: BasicInformation) =>
			useLink ? (
				<Link href={mapFunction(block.id)} key={block.id}>
					{children(block)}
				</Link>
			) : (
				<React.Fragment key={block.id}>{children(block)}</React.Fragment>
			),
		mapIdToPath: mapFunction,
	});
};

export default renderGridSystem;

import React from 'react';
import Link from 'next/link';
import Devider2 from '@/app/components/ui/Devider2';

interface renderGridSystem2Props {
	contentBlocks: any[];
	columns: number;
	useLink?: boolean;
	children: (block: any) => React.ReactNode;
}

const renderGridSystem2: React.FC<renderGridSystem2Props> = ({
	contentBlocks,
	columns,
	children,
}) => {
	const rows: JSX.Element[] = [];
	const totalBlocks = contentBlocks.length;
	const maxColumns = Math.min(columns, 3);

	let rowIndex = 0;

	while (rowIndex < totalBlocks) {
		const rowItems = contentBlocks.slice(rowIndex, rowIndex + maxColumns);

		let colWidth;
		if (rowItems.length === 1) {
			colWidth = `calc(${100}%)`;
		} else if (rowItems.length === 2) {
			colWidth = `calc(${50}%)`;
		} else {
			colWidth = `calc(${100 / maxColumns}%)`;
		}

		rows.push(
			<div
				key={rowIndex}
				className='grid sm:grid-cols-2 md:grid-cols-3'
				style={{ gridTemplateColumns: `repeat(${maxColumns}, ${colWidth})` }}>
				{rowItems.map((block, index) => (
					<React.Fragment key={index}>
						<div style={{ gridColumn: `span 1` }}>
							{block.link ? <Link href={block.link}>{children(block)}</Link> : children(block)}
						</div>
						<div className='block m-auto w-11/12 sm:hidden'>
							<Devider2 />
						</div>
					</React.Fragment>
				))}

				{Array(maxColumns - rowItems.length)
					.fill(null)
					.map((_, emptyIndex) => (
						<div key={`empty-${emptyIndex}`} />
					))}
			</div>
		);

		rowIndex += maxColumns;
	}

	return <div className='bg-white sm:bg-transparent rounded-md overflow-hidden'>{rows}</div>;
};

export default renderGridSystem2;

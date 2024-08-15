import React from 'react';
import { ListOfLinks } from '@/utils/helpers/types';
import { hyperlinks } from '../../o-nama/poslovna-saradnja/BussinessCooperationData';
import Devider from '../ui/Devider';
import H3 from './H3';
import TextLinked from './TextLinked';

interface Props {
	items: ListOfLinks[];
}

const UnorderedList: React.FC<Props> = ({ items }) => {
	const renderBlocks = (items: ListOfLinks[]) => {
		const blocks: JSX.Element[] = [];
		let currentBlock: JSX.Element[] = [];
		let currentH3: JSX.Element | null = null;
		let h4Count = 0;

		items.forEach((item, index) => {
			switch (item.type) {
				case 'h3':
					if (currentH3 && currentBlock.length > 0) {
						blocks.push(renderBlock(currentH3, currentBlock, `block-${index}`));
						currentBlock = [];
						h4Count = 0;
					}
					currentH3 = <H3 text={item.text} key={item.id} />;
					break;
				case 'h4':
					if (currentH3) {
						currentBlock.push(
							<TextLinked
								text={item.text}
								key={`${item.id}-${h4Count}-${index}`}
								hyperlinks={hyperlinks}
								className='pl-4'
							/>
						);
						h4Count++;
					}
					break;
				case 'divider':
					if (currentH3) {
						currentBlock.push(<Devider key={`divider-${index}`} />);
					}
					break;
				default:
					break;
			}
		});

		if (currentH3 && currentBlock.length > 0) {
			blocks.push(renderBlock(currentH3, currentBlock, `final-block`));
		}

		if (blocks.length >= 4) {
			for (let i = 3; i < blocks.length - 1; i++) {
				const currentBlockH3 = blocks[i].props.children[0];
				const nextBlockH3 = blocks[i + 1].props.children[0];
				const currentBlockH4Elements = blocks[i].props.children.slice(1);
				const nextBlockH4Elements = blocks[i + 1].props.children.slice(1);

				if (currentBlockH4Elements.length + nextBlockH4Elements.length < 11) {
					const mergedChildren = [
						renderBlock(currentBlockH3, currentBlockH4Elements, `merged-h3-${i}`),
						renderBlock(nextBlockH3, nextBlockH4Elements, `merged-h3-${i + 1}`),
					];

					blocks[i] = (
						<div className='flex flex-col gap-4' key={`merged-block-${i}`}>
							{mergedChildren}
						</div>
					);

					blocks.splice(i + 1, 1);
					i--;
				}
			}
		}

		return blocks;
	};

	const renderBlock = (h3: JSX.Element, h4Elements: JSX.Element[], key: string) => (
		<div key={key}>
			{h3}
			{h4Elements}
		</div>
	);

	return (
		<div className='grid gap-x-4 lg:gap-x-24 gap-y-4 md:gap-y-4 grid-cols-1 md:grid-cols-2 justify-center items-center'>
			{renderBlocks(items).map((block, index) => (
				<div key={`block-${index}`}>{block}</div>
			))}
		</div>
	);
};

export default UnorderedList;

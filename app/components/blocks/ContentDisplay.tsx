import React from 'react';
import { highlightedText } from '../../o-nama/platforma/InfotrgPlatformData';
import TextNormal from '@/app/components/text/TextNormal';
import HighlightText from '@/app/components/text/HighlightText';
import TextNormalWrapped from '@/app/components/text/TextNormalWrapped';
import H3Title from '@/app/components/text/H3Title';

interface Props {
  data: any;
}

const ContentDisplay: React.FC<Props> = ({ data }) => {
  return (
    <div className='flex flex-col gap-4'>
      {data &&
        data.map((item: any, index: number) => (
          <div key={index}>
            {item.type === 'h3' && <H3Title text={item.content.toUpperCase()} padding={4} />}
            {item.type === 'pNormal' && <TextNormal text={item.content} />}
            {item.type === 'pNormalWrapped' && (
              <TextNormalWrapped>
                <HighlightText text={item.content} keywords={highlightedText} number={item.order} />
              </TextNormalWrapped>
            )}
          </div>
        ))}
    </div>
  );
};

export default ContentDisplay;

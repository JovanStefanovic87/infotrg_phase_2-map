'use client';
import React, { useState } from 'react';
import { NextPage } from 'next';
import { contentData } from './investorsData';
import ContentBlock from './ContentBlock';
import H1 from '../../components/text/H1';
import PageContainer from '../../components/containers/PageContainer';
import Investor from './Investor';
import ContentModalContainer from '@/app/components/containers/ContentModalContainer';
import ContentModalInnerContainer from '@/app/components/containers/ContentModalInnerContainer';
import useScrollToTop from '@/app/helpers/useScrollToTop';

type Data = {
  id: string;
  name: string;
  share: string;
};

const Investors: NextPage = () => {
  useScrollToTop();
  const [modalData, setModalData] = useState<{
    type: 'investment' | 'withdrawal' | 'transfer';
    data: Data;
  } | null>(null);

  const handleOpenModal = (type: 'investment' | 'withdrawal' | 'transfer', data: Data) => {
    setModalData({ type, data });
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  return (
    <PageContainer>
      <H1 title='INVESTITORI' />

      <div className='lg:grid lg:grid-cols-3 lg:gap-8 rounded-md overflow-hidden'>
        {contentData.map((block) => (
          <ContentBlock
            key={block.id}
            id={block.id}
            name={block.name}
            email={block.email}
            phone={block.phone}
            amount={block.amount}
            share={block.share}
            amountMinusTransfer={block.amountMinusTransfer}
            shareMinusTransfer={block.shareMinusTransfer}
            onOpenModal={(type) =>
              handleOpenModal(type, {
                id: block.id,
                name: block.name,
                share: block.share,
              })
            }
          />
        ))}
      </div>

      {modalData && (
        <ContentModalContainer onContentModalClose={handleCloseModal} isStandard={false}>
          <ContentModalInnerContainer>
            <Investor
              id={modalData.data.id}
              view={modalData.type}
              name={modalData.data.name}
              share={modalData.data.share}
            />
          </ContentModalInnerContainer>
        </ContentModalContainer>
      )}
    </PageContainer>
  );
};

export default Investors;

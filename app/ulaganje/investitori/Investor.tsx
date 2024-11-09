import React from 'react';
import { invested, transfered, contentData } from './investorsData';
import BlockTitle from '@/app/components/text/BlockTitle';

interface Props {
  id: string;
  name: string;
  view: 'investment' | 'withdrawal' | 'transfer';
  share: string;
}

const Investor: React.FC<Props> = ({ id, name, view, share }) => {
  // Pronađi podatke u contentData prema id-u
  const investorData = contentData.find((item) => item.id === id);
  const investments = invested[id] || [];
  const transfers = transfered[id] || [];

  return (
    <div>
      {view === 'investment' ? (
        <div>
          <BlockTitle text='ULAGANJE FINANSIJA' bgColor='yellowLighter' align='center' />
          <div className='flex flex-col gap-4'>
            <div className='mt-4'>
              <p className='text-lg text-black'>
                <strong>Ime i prezime :</strong> {name}
              </p>
              <p className='text-lg text-black'>
                <strong>Registarski broj :</strong> {id}
              </p>
            </div>
            <table className='w-full bg-white border border-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-3 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600'>
                    Datum
                  </th>
                  {investorData?.amount && (
                    <th className='px-3 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600'>
                      Iznos
                    </th>
                  )}
                  <th className='px-3 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600'>
                    Udeo
                  </th>
                </tr>
              </thead>
              <tbody>
                {investments.map((investment, index) => (
                  <tr key={index} className='hover:bg-gray-100'>
                    <td className='px-3 py-4 border-b border-gray-200 text-sm text-gray-700'>
                      {investment.date}
                    </td>
                    {investorData?.amount && (
                      <td className='px-3 py-4 border-b border-gray-200 text-sm text-gray-700'>
                        {investment.amountMinusTransfer || investment.amount} EUR
                      </td>
                    )}
                    <td className='px-3 py-4 border-b border-gray-200 text-sm text-gray-700'>
                      {investment.shareMinusTransfer || investment.share}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className='text-lg text-black'>
              <strong>Ukupno uloženo: </strong>
              {investorData?.amount} EUR / {investorData?.share}%
            </p>
            {transfers.length > 0 && (
              <>
                <BlockTitle text='PRENOS VLASNIČKIH UDELA' bgColor='yellowLighter' align='center' />
                <table className='w-full bg-white border border-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-3 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600'>
                        Datum
                      </th>
                      <th className='px-3 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600'>
                        Iznos
                      </th>
                      <th className='px-3 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600'>
                        Udeo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transfers.map((transfer, index) => (
                      <tr key={index} className='hover:bg-gray-100'>
                        <td className='px-3 py-4 border-b border-gray-200 text-sm text-gray-700'>
                          {transfer.date}
                        </td>
                        <td className='px-3 py-4 border-b border-gray-200 text-sm text-gray-700'>
                          {transfer.amount} EUR
                        </td>
                        <td className='px-3 py-4 border-b border-gray-200 text-sm text-gray-700'>
                          {transfer.share}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className='text-lg text-black'>
                  <strong>Ukupan prenos: </strong> {investorData?.totalTransferedAmount} EUR /{' '}
                  {investorData?.totalSharedShare}%
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div>
          <BlockTitle text='POVLAČENJE FINANSIJA' bgColor='yellowLighter' align='center' />
          <p className='text-lg text-black'>
            <strong>Ukupno:</strong> 0 EUR 0.00%
          </p>
        </div>
      )}
    </div>
  );
};

export default Investor;

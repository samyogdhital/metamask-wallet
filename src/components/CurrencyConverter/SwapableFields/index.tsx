import React from 'react';
import Input from '@/components/Input';
import { checkInt } from '@/utils';
import { CURRENCY_CONVERSION_RATE } from '@/constants';
import SwapIcon from '@/components/CurrencyConverter/SwapIcon';

const SwapableFields = () => {
  const [swap, setSwap] = React.useState<boolean>(false);
  const [nep, setNep] = React.useState<number>(0);

  const busd: number = nep * CURRENCY_CONVERSION_RATE;

  const varients = {
    animate: {
      transform: 'rotate(180deg)',
    },
  };

  return (
    <div>
      {!swap ? (
        <>
          <Input
            id='nep'
            type='number'
            placeholder='NEP'
            label='Nep'
            onChange={(e) => setNep(parseInt(e.target.value))}
            value={checkInt(nep) ? nep : nep.toFixed(2)}
            aria-ddescribedby='nep input'
          />
          <SwapIcon setSwap={setSwap} animate='animate' variants={varients} />
          <Input
            id='busd'
            type='number'
            placeholder='BUSD'
            label='Busd'
            value={checkInt(busd) ? busd : busd.toFixed(2)}
            onChange={(e) =>
              setNep(parseInt(e.target.value) / CURRENCY_CONVERSION_RATE)
            }
            aria-ddescribedby='busd input'
          />
        </>
      ) : (
        <>
          <Input
            id='busd'
            type='number'
            placeholder='BUSD'
            label='Busd'
            value={checkInt(busd) ? busd : busd.toFixed(2)}
            onChange={(e) =>
              setNep(parseInt(e.target.value) / CURRENCY_CONVERSION_RATE)
            }
            aria-ddescribedby='busd input'
          />
          <SwapIcon setSwap={setSwap} />
          <Input
            id='nep'
            type='number'
            placeholder='NEP'
            label='Nep'
            onChange={(e) => setNep(parseInt(e.target.value))}
            value={checkInt(nep) ? nep : nep.toFixed(2)}
            aria-ddescribedby='nep input'
          />
        </>
      )}
    </div>
  );
};

export default SwapableFields;

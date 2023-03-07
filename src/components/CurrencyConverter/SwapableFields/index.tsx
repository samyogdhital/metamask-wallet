import React from 'react';
import Input from '@/components/Input';
import { checkInt } from '@/utils';
import { CURRENCY_CONVERSION_RATE } from '@/constants';

const SwapableFields = () => {
  const [swap, setSwap] = React.useState<boolean>(false);
  const [nep, setNep] = React.useState<number>(0);
  const busd: number = nep * CURRENCY_CONVERSION_RATE;

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
          />
          <br />
          <div onClick={() => setSwap((pre) => !pre)}>swap</div>
          <br />
          <Input
            id='busd'
            type='number'
            placeholder='BUSD'
            label='Busd'
            value={checkInt(busd) ? busd : busd.toFixed(2)}
            onChange={(e) =>
              setNep(parseInt(e.target.value) / CURRENCY_CONVERSION_RATE)
            }
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
          />
          <br />
          <div onClick={() => setSwap((pre) => !pre)}>swap</div>
          <br />
          <Input
            id='nep'
            type='number'
            placeholder='NEP'
            label='Nep'
            onChange={(e) => setNep(parseInt(e.target.value))}
            value={checkInt(nep) ? nep : nep.toFixed(2)}
          />
        </>
      )}
    </div>
  );
};

export default SwapableFields;

import React from 'react';
import SwapIcon from '@/components/CurrencyConverter/SwapIcon';
import Input from '@/components/Input';
import { CURRENCY_CONVERSION_RATE } from '@/constants';
import { checkInt } from '@/utils';

const SwapableFields = () => {
  const [swap, setSwap] = React.useState<boolean>(false);
  const [nep, setNep] = React.useState<number>(0);

  const busd: number = nep * CURRENCY_CONVERSION_RATE;

  const varients = {
    animate: {
      transform: 'rotate(180deg) scale(1.7)',
    },
  };

  return (
    <div>
      {!swap ? (
        <>
          <Input
            id="nep"
            type="number"
            placeholder="NEP"
            label="NEP"
            onChange={(e) => setNep(+e.target.value)}
            value={checkInt(nep) ? nep : nep.toFixed(2)}
            aria-describedby="nep-help-text"
            style={{
              marginBottom: '20px',
            }}
          />
          <SwapIcon
            title="Swap currency"
            setSwap={setSwap}
            animate="animate"
            variants={varients}
          />
          <Input
            id="busd"
            type="number"
            placeholder="BUSD"
            label="BUSD"
            value={checkInt(busd) ? busd : busd.toFixed(2)}
            onChange={(e) => setNep(+e.target.value / CURRENCY_CONVERSION_RATE)}
            aria-describedby="busd-help-text"
          />
        </>
      ) : (
        <>
          <Input
            id="busd"
            type="number"
            placeholder="BUSD"
            label="BUSD"
            value={checkInt(busd) ? busd : busd.toFixed(2)}
            onChange={(e) => setNep(+e.target.value / CURRENCY_CONVERSION_RATE)}
            aria-describedby="busd-help-text"
            style={{
              marginBottom: '20px',
            }}
          />
          <SwapIcon
            title="Swap currency"
            animate={{
              transform: 'scale(2)',
            }}
            setSwap={setSwap}
          />
          <Input
            id="nep"
            type="number"
            placeholder="NEP"
            label="NEP"
            onChange={(e) => setNep(+e.target.value)}
            value={checkInt(nep) ? nep : nep.toFixed(2)}
            aria-describedby="nep-help-text"
          />
        </>
      )}
      <p id="nep-help-text" className="visually-hidden">
        Enter NEP currency to convert
      </p>
      <p id="busd-help-text" className="visually-hidden">
        Enter BUSD currency to convert
      </p>
    </div>
  );
};

export default SwapableFields;

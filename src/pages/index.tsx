import React from 'react';

const checkInt = (num: number) => Number.isInteger(num);
const conversionRate = 3;

export default function Home() {
  const [nep, setNep] = React.useState(0);
  const [swap, setSwap] = React.useState(false);
  const busd = nep * conversionRate;

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
            onChange={(e) => setNep(parseInt(e.target.value) / conversionRate)}
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
            onChange={(e) => setNep(parseInt(e.target.value) / conversionRate)}
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
}

function Input(
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    label: string;
  }
) {
  const { id, label, ...rest } = props;

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...rest} />
    </>
  );
}

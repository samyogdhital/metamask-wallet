import { hooks, metaMask } from '@/utils/metamask';
import React from 'react';
import { ModalProps } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const checkInt = (num: number) => Number.isInteger(num);
const conversionRate = 3;

export default function Home() {
  const [nep, setNep] = React.useState(0);
  const [swap, setSwap] = React.useState(false);
  const busd = nep * conversionRate;

  const [walletToggle, setWalletToggle] = React.useState(false);

  const {
    useChainId,
    useAccounts,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
  } = hooks;

  const chainId = useChainId();

  console.log({ chainId });

  React.useEffect(() => {
    metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask');
    });
  }, []);

  return (
    <div className=''>
      <Wallet show={walletToggle} onHide={() => setWalletToggle(false)} />
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

      <br />
      <br />
      {/* <button onClick={() => setWalletToggle((pre) => !pre)}> */}
      <button
        onClick={() => {
          //connect wallet here
          if (chainId) {
            console.log(metaMask, 'disconnect');
            metaMask.actions.resetState();
          } else {
            metaMask.activate();
          }
        }}
      >
        {chainId ? 'Disconnect' : 'Check Wallet Details'}
      </button>

      {/* <div>Chain Here; Eg: Polygon Mumbai</div> */}
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

function Wallet(props: ModalProps) {
  return (
    <Modal
      {...props}
      size='sm'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Body className='text-danger'>
        <h4 className='text-center'>Connect to MetaMask</h4>
        <p className='text-center'>Are you sure you want to connect ?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Connect</Button>
      </Modal.Footer>
    </Modal>
  );
}

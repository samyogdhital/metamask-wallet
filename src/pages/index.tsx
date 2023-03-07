import { hooks, metaMask } from '@/utils/metamask';
import React from 'react';
import { ModalProps } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import type { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import type { Web3ReactHooks } from '@web3-react/core';
import { useState } from 'react';
import { EthErrorType } from '@/types';
import { METAMASK_CONNECTION_FAILED, METAMASK_NOT_FOUND } from '@/constants';
import WalletDetails from '@/components/WalletDetails';

const checkInt = (num: number): boolean => Number.isInteger(num);
const conversionRate: number = 3;

export default function Home() {
  const [nep, setNep] = React.useState<number>(0);
  const [swap, setSwap] = React.useState<Boolean>(false);
  const busd: number = nep * conversionRate;

  const [confirmConnect, setConfirmConnect] = React.useState<boolean>(false);
  const [ethErr, setEthErr] = React.useState<EthErrorType>({
    type: null,
    message: null,
  });
  const [showWallet, setShowWallet] = React.useState<boolean>(false);

  const {
    useChainId,
    useAccounts,
    useProvider,
    useENSNames,
    useIsActivating,
    useIsActive,
  } = hooks;

  // const chainId = useChainId();
  const accounts = useAccounts();
  const provider = useProvider();
  // const ENSNames = useENSNames(provider);
  const activating = useIsActivating();
  const active = useIsActive();

  React.useEffect(() => {
    if (!window.ethereum) {
      setEthErr({
        type: METAMASK_NOT_FOUND,
        message: 'Please install the metamask wallet',
      });
    }
  }, []);

  React.useEffect(() => {
    if (accounts && accounts.length) {
      setEthErr({ type: null, message: null });
    }
  }, [accounts?.length]);

  return (
    <div>
      <ConnectWallet
        show={confirmConnect}
        onHide={() => setConfirmConnect(false)}
        onConfirm={() => {
          metaMask.activate().catch(() => {
            setEthErr({
              type: METAMASK_CONNECTION_FAILED,
              message: 'Error while connecting to metamask',
            });
          });
          setConfirmConnect(false);
          setShowWallet(true);
        }}
      />
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
      <button
        onClick={() => setConfirmConnect(true)}
        disabled={ethErr.type === 'METAMASK_NOT_FOUND'}
      >
        {activating ? 'Connecting...' : 'Check Wallet Details'}
      </button>
      <br />
      {ethErr.type && ethErr.message}

      <WalletDetails
        show={!!accounts?.length && showWallet}
        onHide={() => setShowWallet(false)}
        centered
        accounts={accounts}
        provider={provider}
      />
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

function ConnectWallet({
  onConfirm,
  ...props
}: ModalProps & { onConfirm: () => void }) {
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
        <Button onClick={onConfirm}>Connect</Button>
      </Modal.Footer>
    </Modal>
  );
}

function useBalances(
  provider?: ReturnType<Web3ReactHooks['useProvider']>,
  accounts?: string[]
): BigNumber[] | undefined {
  const [balances, setBalances] = useState<BigNumber[] | undefined>();

  React.useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false;

      void Promise.all(
        accounts.map((account) => provider.getBalance(account))
      ).then((balances) => {
        if (stale) return;
        setBalances(balances);
      });

      return () => {
        stale = true;
        setBalances(undefined);
      };
    }
  }, [provider, accounts]);

  return balances;
}

function Values({
  accounts,
  provider,
}: {
  accounts: ReturnType<Web3ReactHooks['useAccounts']>;
  provider: ReturnType<Web3ReactHooks['useProvider']>;
}) {
  if (!accounts) return null;
  const balances = useBalances(provider, accounts);

  //useEffect to connect to eth here
  return (
    <div>
      <b>
        {!accounts.length
          ? 'None'
          : accounts.map((account, i) => (
              <ul
                key={account}
                style={{
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {account}
                <br />
                {balances && balances[i]
                  ? `Balance: (Ξ${formatEther(balances[i])})`
                  : null}
              </ul>
            ))}
        <button
          onClick={() => {
            metaMask.resetState();
          }}
        >
          Disconnect
        </button>
      </b>
    </div>
  );
}

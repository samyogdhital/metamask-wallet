import { hooks, metaMask } from '@/utils/metamask';
import React from 'react';
import { ModalProps } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import type { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import type { Web3ReactHooks } from '@web3-react/core';
import { useState } from 'react';

const checkInt = (num: number): boolean => Number.isInteger(num);
const conversionRate: number = 3;

export default function Home() {
  const [nep, setNep] = React.useState<number>(0);
  const [swap, setSwap] = React.useState<Boolean>(false);
  const busd: number = nep * conversionRate;

  const [walletToggle, setWalletToggle] = React.useState<boolean>(false);
  const [ethErr, setEthErr] = React.useState<string | null>(null);
  const [showWallet, setShowWallet] = React.useState<boolean>(false);

  const {
    useChainId,
    useAccounts,
    useProvider,
    useENSNames,
    useIsActivating,
    useIsActive,
  } = hooks;

  const chainId = useChainId();
  const accounts = useAccounts();
  const provider = useProvider();
  const ENSNames = useENSNames(provider);
  const activating = useIsActivating();
  const active = useIsActive();

  React.useEffect(() => {
    if (accounts && accounts.length) {
      setEthErr(null);
      if (!active) {
        metaMask.connectEagerly();
      }
    }
  }, [accounts?.length]);

  return (
    <div className=''>
      <Wallet
        show={walletToggle}
        onExit={() => {
          metaMask.activate().catch(() => {
            setEthErr('Error While Connecting');
          });
        }}
        onHide={() => setWalletToggle(false)}
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
        onClick={() => {
          if (active) {
            metaMask.resetState();
          } else {
            setWalletToggle(true);
          }
        }}
      >
        {active
          ? 'Disconnect'
          : activating
          ? 'Connecting...'
          : 'Check Wallet Details'}
      </button>
      {ethErr && ethErr}
      <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
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

function Accounts({
  accounts,
  provider,
  ENSNames,
}: {
  accounts: ReturnType<Web3ReactHooks['useAccounts']>;
  provider: ReturnType<Web3ReactHooks['useProvider']>;
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']>;
}) {
  const balances = useBalances(provider, accounts);
  if (!accounts) return null;

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
                {ENSNames?.[i] ?? account}
                <br />
                {balances && balances[i]
                  ? `Balance: (Ξ${formatEther(balances[i])})`
                  : null}
              </ul>
            ))}
      </b>
    </div>
  );
}

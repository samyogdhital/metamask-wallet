import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ConnectWallet from '@/components/Wallet/ConnectWallet';
import WalletModal from '@/components/Wallet/WalletModal';
import { METAMASK_CONNECTION_FAILED, METAMASK_NOT_FOUND } from '@/constants';
import { EthErrorType } from '@/types';
import { hooks, metaMask } from '@/utils/metamask';

const MetaMaskWallet = () => {
  const [showWallet, setShowWallet] = React.useState<boolean>(false);
  const [confirmConnect, setConfirmConnect] = React.useState<boolean>(false);
  const [ethErr, setEthErr] = React.useState<EthErrorType>({
    type: null,
    message: null,
  });

  const { useAccounts, useProvider, useIsActivating, useIsActive } = hooks;

  const accounts = useAccounts();
  const provider = useProvider();
  const activating = useIsActivating();

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
  }, [accounts]);

  const onConfirm = () => {
    metaMask.activate().catch(() => {
      setEthErr({
        type: METAMASK_CONNECTION_FAILED,
        message: 'Error while connecting to metamask',
      });
    });
    setConfirmConnect(false);
    setShowWallet(true);
  };

  const onHide = () => {
    setShowWallet(false);
    metaMask.resetState();
  };

  return (
    <>
      <ConnectWallet
        onConfirm={onConfirm}
        onHide={() => setConfirmConnect(false)}
        show={confirmConnect}
        animation={false}
      />
      <WalletModal
        accounts={accounts}
        provider={provider}
        onHide={onHide}
        show={!!accounts?.length && showWallet}
        backdrop={false}
        animation={false}
        centered
      />
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          className="mt-5 m-0"
          onClick={() => setConfirmConnect(true)}
          disabled={ethErr.type === 'METAMASK_NOT_FOUND'}
        >
          {activating ? 'Please Wait 😀' : 'Check wallet details'}
        </Button>
      </div>

      <div>{ethErr.type && ethErr.message}</div>
    </>
  );
};
export default MetaMaskWallet;

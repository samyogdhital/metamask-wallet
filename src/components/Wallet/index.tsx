import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import WalletModal from '@/components/Wallet/WalletModal';
import ConnectWallet from '@/components/Wallet/ConnectWallet';
import { hooks, metaMask } from '@/utils/metamask';
import { EthErrorType } from '@/types';
import { METAMASK_CONNECTION_FAILED, METAMASK_NOT_FOUND } from '@/constants';

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
  }, [accounts?.length]);

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

  return (
    <div>
      <ConnectWallet
        show={confirmConnect}
        onHide={() => setConfirmConnect(false)}
        onConfirm={onConfirm}
      />
      <WalletModal
        show={!!accounts?.length && showWallet}
        onHide={() => setShowWallet(false)}
        centered
        accounts={accounts}
        provider={provider}
      />
      <Button
        onClick={() => setConfirmConnect(true)}
        disabled={ethErr.type === 'METAMASK_NOT_FOUND'}
      >
        {activating ? <Spinner /> : 'Check Wallet Details'}
      </Button>
      <div>{ethErr.type && ethErr.message}</div>
    </div>
  );
};
export default MetaMaskWallet;

import React from 'react';
import Button from 'react-bootstrap/Button';
import ConnectWallet from '@/components/Wallet/ConnectWallet';
import WalletModal from '@/components/Wallet/WalletModal';
import { METAMASK_CONNECTION_FAILED, METAMASK_NOT_FOUND } from '@/constants';
import { EthErrorType, MetaMaskWalletProps } from '@/types';
import { hooks, metaMask } from '@/utils/metamask';

const MetaMaskWallet = ({
  showWallet,
  setShowWallet,
  confirmConnect,
  setConfirmConnect,
}: MetaMaskWalletProps) => {
  const [ethErr, setEthErr] = React.useState<EthErrorType>({
    type: null,
    message: null,
  });

  const { useAccounts, useProvider, useIsActivating } = hooks;

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
        message: 'Error connecting to metamask',
      });
      setShowWallet(false);
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
      <div className="button-wrapper">
        <div className="error">{ethErr.type && ethErr.message}</div>
        <Button
          className="mt-5"
          onClick={() => setConfirmConnect(true)}
          disabled={ethErr.type === 'METAMASK_NOT_FOUND'}
          aria-label="Check wallet details"
        >
          {activating ? 'Please wait 😀' : 'Check wallet details'}
        </Button>
      </div>
    </>
  );
};
export default MetaMaskWallet;

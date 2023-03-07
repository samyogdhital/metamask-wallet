import React from 'react';
import ConnectWallet from '@/components/Wallet/ConnectWallet';
import WalletModal from '@/components/Wallet/WalletModal';
import { EthErrorType } from '@/types';
import { hooks, metaMask } from '@/utils/metamask';
import { METAMASK_CONNECTION_FAILED, METAMASK_NOT_FOUND } from '@/constants';

const MetaMaskWallet = () => {
  const [showWallet, setShowWallet] = React.useState<boolean>(false);
  const [confirmConnect, setConfirmConnect] = React.useState<boolean>(false);
  const [ethErr, setEthErr] = React.useState<EthErrorType>({
    type: null,
    message: null,
  });

  const {
    useChainId,
    useAccounts,
    useProvider,
    useENSNames,
    useIsActivating,
    useIsActive,
  } = hooks;

  const accounts = useAccounts();
  const provider = useProvider();
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
      <button
        onClick={() => setConfirmConnect(true)}
        disabled={ethErr.type === 'METAMASK_NOT_FOUND'}
      >
        {activating ? 'Connecting...' : 'Check Wallet Details'}
      </button>
      <div>{ethErr.type && ethErr.message}</div>
    </div>
  );
};

export default MetaMaskWallet;

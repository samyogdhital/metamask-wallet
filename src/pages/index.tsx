import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import SwapableFields from '@/components/CurrencyConverter/SwapableFields';
import MetaMaskWallet from '@/components/Wallet';
import { hooks } from '@/utils/metamask';

const { useAccounts } = hooks;

const Home = () => {
  const accounts = useAccounts();
  const [showWallet, setShowWallet] = React.useState<boolean>(false);
  const [confirmConnect, setConfirmConnect] = React.useState<boolean>(false);

  const props = {
    showWallet,
    setShowWallet,
    confirmConnect,
    setConfirmConnect,
  };

  const showBlur = confirmConnect || (accounts?.length && showWallet);

  return (
    <main className="vh-100 flex-center" aria-label="Home Page">
      <motion.div
        className="form-wrapper"
        animate={{
          filter: showBlur ? 'blur(1rem)' : 'blur(0rem)',
        }}
      >
        <div className="flex-center mb-5">
          <Image
            className="animate-scale"
            src="/metamask.png"
            width={200}
            height={200}
            alt="MetaMask Logo"
          />
        </div>

        <SwapableFields />
        <MetaMaskWallet {...props} />
      </motion.div>
    </main>
  );
};

export default Home;

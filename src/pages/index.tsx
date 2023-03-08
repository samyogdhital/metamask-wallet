import React from 'react';
import { motion } from 'framer-motion';
import SwapableFields from '@/components/CurrencyConverter/SwapableFields';
import MetaMaskWallet from '@/components/Wallet';
import { hooks } from '@/utils/metamask';

const motionStyle = {
  background: 'rgb(117 0 177 / 55%)',
  padding: '150px',
  borderRadius: '10px',
};

const { useAccounts } = hooks;

const Home = () => {
  const accounts = useAccounts();

  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center flex-column">
      <motion.div
        style={motionStyle}
        animate={{
          filter: accounts?.length ? 'blur(1rem)' : 'blur(0rem)',
        }}
      >
        <SwapableFields />
        <MetaMaskWallet />
      </motion.div>
    </div>
  );
};

export default Home;

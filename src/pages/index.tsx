import { motion } from 'framer-motion';
import SwapableFields from '@/components/CurrencyConverter/SwapableFields';
import MetaMaskWallet from '@/components/Wallet';

const Home = () => {
  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center flex-column">
      <motion.div
        style={{
          background: 'rgb(117 0 177 / 55%)',
          padding: '100px',
          borderRadius: '10px',
          transform: 'scale(1)',
        }}
        animate={{
          borderRadius: '10px',
          transform: 'scale(1.1)',
        }}
      >
        <SwapableFields />
        <MetaMaskWallet />
      </motion.div>
    </div>
  );
};

export default Home;

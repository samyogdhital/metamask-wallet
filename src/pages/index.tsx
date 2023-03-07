import SwapableFields from '@/components/CurrencyConverter/SwapableFields';
import MetaMaskWallet from '@/components/Wallet';

const Home = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <SwapableFields />
      <MetaMaskWallet />
    </div>
  );
};

export default Home;

import React from 'react';
import MetaMaskWallet from '@/components/Wallet';
import SwapableFields from '@/components/CurrencyConverter/SwapableFields';

export default function Home() {
  return (
    <>
      <SwapableFields />
      <MetaMaskWallet />
    </>
  );
}

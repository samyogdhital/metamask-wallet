import React from 'react';
import { formatEther } from '@ethersproject/units';
import { Web3ReactHooks } from '@web3-react/core';
import { useBalances } from '@/hooks/useBalances';
import { hooks } from '@/utils/metamask';

type Props = {
  accounts: ReturnType<Web3ReactHooks['useAccounts']>;
  provider: ReturnType<Web3ReactHooks['useProvider']>;
};

const WalletDetails = ({ accounts, provider }: Props) => {
  const balances = useBalances(provider, accounts || []);
  const { useChainId } = hooks;
  const chain = useChainId();
  if (!accounts) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {accounts.length &&
        accounts.map((account, i) => {
          const balance =
            balances && balances[i] ? `Ξ ${formatEther(balances[i])}` : null;

          return (
            <React.Fragment key={i}>
              <DetailItem label="Account" value={account} />
              <DetailItem label="Chain ID" value={chain?.toString() || null} />
              <DetailItem label="Balance" value={balance} />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default WalletDetails;

function DetailItem({ label, value }: { label: string; value: string | null }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '5px',
      }}
    >
      <div>{label}</div>
      <div>{value && value}</div>
    </div>
  );
}

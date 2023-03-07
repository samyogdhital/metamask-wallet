import { useBalances } from '@/hooks/useBalances';
import { metaMask } from '@/utils/metamask';
import { formatEther } from '@ethersproject/units';
import { Web3ReactHooks } from '@web3-react/core';
import React from 'react';

type Props = {
  accounts: ReturnType<Web3ReactHooks['useAccounts']>;
  provider: ReturnType<Web3ReactHooks['useProvider']>;
};

const WalletDetails = ({ accounts, provider }: Props) => {
  if (!accounts) return null;
  const balances = useBalances(provider, accounts);

  return (
    <>
      <div>
        <b>
          {!accounts.length
            ? 'None'
            : accounts.map((account, i) => (
                <ul
                  key={account}
                  style={{
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {account}
                  <br />
                  {balances && balances[i]
                    ? `Balance: (Ξ${formatEther(balances[i])})`
                    : null}
                </ul>
              ))}
          <button
            onClick={() => {
              metaMask.resetState();
            }}
          >
            Disconnect
          </button>
        </b>
      </div>
    </>
  );
};

export default WalletDetails;

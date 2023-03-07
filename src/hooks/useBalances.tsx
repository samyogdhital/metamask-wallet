import { ProviderType, UseBalanceType } from '@/types';
import React from 'react';

export function useBalances(
  provider: ProviderType,
  accounts: string[]
): UseBalanceType {
  const [balances, setBalances] = React.useState<UseBalanceType>();

  React.useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false;

      void Promise.all(
        accounts.map((account) => provider.getBalance(account))
      ).then((balances) => {
        if (stale) return;
        setBalances(balances);
      });

      return () => {
        stale = true;
        setBalances(undefined);
      };
    }
  }, [provider, accounts]);

  return balances;
}

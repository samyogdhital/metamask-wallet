import { METAMASK_CONNECTION_FAILED, METAMASK_NOT_FOUND } from '@/constants';
import { BigNumber } from '@ethersproject/bignumber';
import { Web3ReactHooks } from '@web3-react/core';

export type EthErrorType = {
  type: typeof METAMASK_NOT_FOUND | typeof METAMASK_CONNECTION_FAILED | null;
  message: string | null;
};

export type UseBalanceType = BigNumber[] | undefined;
export type ProviderType = ReturnType<Web3ReactHooks['useProvider']>;

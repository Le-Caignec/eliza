import { type Action, type Content, type IAgentRuntime, type Memory, type State, logger } from '@elizaos/core';
import { ethers } from 'ethers';

export const getWalletBalanceAction: Action = {
  name: 'GET_WALLET_BALANCE',
  similes: ['CHECK_BALANCE', 'GET_ETH_BALANCE'],
  description: 'Get the ETH balance of a wallet address',

  validate: async (_runtime: IAgentRuntime, message: Memory, _state: State): Promise<boolean> => {
    const address = message.content?.text?.trim();
    return ethers.isAddress(address ?? '');
  },

  handler: async (
    _runtime: IAgentRuntime,
    message: Memory,
    _state: State,
    _options: any,
    callback
  ) => {
    const address = message.content.text.trim();
    const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);

    try {
      const balance = await provider.getBalance(address);
      const ethBalance = ethers.formatEther(balance);

      const response: Content = {
        text: `The balance of ${address} is ${ethBalance} ETH`,
        actions: ['GET_WALLET_BALANCE'],
        source: message.content.source,
      };

      await callback(response);
      return response;
    } catch (err) {
      logger.error('[Ethereum Plugin] Error fetching balance:', err);
      throw new Error('Failed to get wallet balance');
    }
  },

  examples: [
    [
      {
        name: 'user',
        content: {
          text: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        },
      },
      {
        name: 'eliza',
        content: {
          text: 'The balance of 0x742d35Cc6634C0532925a3b844Bc454e4438f44e is ... ETH',
          actions: ['GET_WALLET_BALANCE'],
        },
      },
    ],
  ],
};

import type { Plugin } from '@elizaos/core';
import {
  ModelType,
  logger,
} from '@elizaos/core';
import { z } from 'zod';
import { getWalletBalanceAction } from './actions/getWalletBalanceAction';
import { BlockchainBalanceService } from './services/blockchainService';

const configSchema = z.object({
  ETHEREUM_RPC_URL: z.string().url().min(1, 'Ethereum RPC URL is required'),
});

export const iexecPlugin: Plugin = {
  name: 'plugin-ethereum',
  description: 'Ethereum plugin to fetch wallet balances',
  config: {
    ETHEREUM_RPC_URL: process.env.ETHEREUM_RPC_URL,
  },

  async init(config: Record<string, string>) {
    logger.info('[Ethereum Plugin] Initializing...');
    try {
      const validatedConfig = await configSchema.parseAsync(config);
      for (const [key, value] of Object.entries(validatedConfig)) {
        process.env[key] = value;
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          `Invalid plugin configuration: ${error.errors.map((e) => e.message).join(', ')}`
        );
      }
      throw error;
    }
  },

  actions: [getWalletBalanceAction],

  routes: [
    {
      path: '/balance/:address',
      type: 'GET',
      handler: async (req, res) => {
        const providerUrl = process.env.ETHEREUM_RPC_URL!;
        const { ethers } = await import('ethers');
        const provider = new ethers.JsonRpcProvider(providerUrl);
        const address = req.params.address;
        try {
          const balance = await provider.getBalance(address);
          const ethBalance = ethers.formatEther(balance);
          res.json({ address, balance: ethBalance });
        } catch (err) {
          res.status(500).json({ error: 'Error fetching balance' });
        }
      },
    },
  ],

  models: {
    [ModelType.TEXT_SMALL]: async () => {
      return 'Ethereum plugin (small model) active.';
    },
    [ModelType.TEXT_LARGE]: async () => {
      return 'Ethereum plugin (large model) active.';
    },
  },

  services: [BlockchainBalanceService],
};

export default iexecPlugin;

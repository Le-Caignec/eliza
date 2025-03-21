import { Service, type IAgentRuntime, logger } from '@elizaos/core';

export class BlockchainBalanceService extends Service {
  static serviceType = 'ethereum-balance';

  capabilityDescription = 'Ethereum service for wallet balance queries';

  constructor(protected runtime: IAgentRuntime) {
    super(runtime);
  }

  static async start(runtime: IAgentRuntime) {
    logger.info('[Ethereum Service] Starting service...');
    return new BlockchainBalanceService(runtime);
  }

  static async stop(runtime: IAgentRuntime) {
    const service = runtime.getService(BlockchainBalanceService.serviceType);
    if (!service) throw new Error('EthereumBalanceService not found');
    service.stop();
  }

  async stop() {
    logger.info('[Ethereum Service] Stopping service...');
  }
}

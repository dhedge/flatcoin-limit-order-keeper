import { Injectable, Logger } from '@nestjs/common';
import { InjectEthersProvider } from 'nestjs-ethers';
import { JsonRpcBatchProvider, JsonRpcProvider } from '@ethersproject/providers';
import { Contract, ethers, Wallet } from 'ethers';
import { LeveragePositionData } from '../dto/shared-types';
import { LimitOrder } from '../contract/limit-order';
import { ViewerGetPositionData } from '../contract/viewer-get-position-data';
import { Viewer } from '../contract/viewer';
import { LeverageModule } from '../contract/leverage-module';

@Injectable()
export class AppTxExecutorService {
  private readonly batchProvider: JsonRpcBatchProvider;
  private readonly signer: Wallet;
  private readonly limitOrderContract: Contract;
  private readonly viewerModuleContractBatch: Contract;
  private readonly viewerModuleContract: Contract;
  private readonly leverageModuleContract: Contract;

  constructor(
    @InjectEthersProvider()
    private readonly provider: JsonRpcProvider,
    private readonly logger: Logger,
  ) {
    this.batchProvider = new JsonRpcBatchProvider(process.env.PROVIDER_HTTPS_URL);
    this.signer = new Wallet(process.env.SIGNER_WALLET_PK, this.provider);
    this.limitOrderContract = new Contract(process.env.LIMIT_ORDER_CONTRACT_ADDRESS, LimitOrder, this.signer);
    this.viewerModuleContractBatch = new Contract(process.env.VIEWER_CONTRACT_ADDRESS, ViewerGetPositionData, this.batchProvider);
    this.viewerModuleContract = new Contract(process.env.VIEWER_CONTRACT_ADDRESS, Viewer, this.provider);
    this.leverageModuleContract = new Contract(process.env.LEVERAGE_MODULE_CONTRACT_ADDRESS, LeverageModule, this.provider);
  }

  public async executeLimitOrder(tokenId: number, priceFeedUpdateData: string[]): Promise<string> {
    this.logger.log(`executing limit order for position ${tokenId} ...`);
    let estimated = null;
    try {
      estimated = await this.limitOrderContract.estimateGas.executeLimitOrder(tokenId, priceFeedUpdateData, {
        value: '1',
      });
    } catch (error) {
      this.logger.error(`failed to estimate gas for tokenId: ${tokenId}`);
      throw new Error(error);
    }

    this.logger.log(`tx estimated: ${estimated}`);
    const tx = await this.limitOrderContract.executeLimitOrder(tokenId, priceFeedUpdateData, {
      gasLimit: ethers.utils.hexlify(estimated.add(estimated.mul(40).div(100))),
      value: '1',
    });
    const receipt = await tx.wait();
    return receipt?.transactionHash;
  }

  public async getPositionDataBatched(tokenIds: number[]): Promise<LeveragePositionData[]> {
    const batches = [];

    for (let i = 0; i < tokenIds.length; i++) {
      batches.push(this.viewerModuleContractBatch.getPositionData(tokenIds[i]));
    }

    return (await Promise.all(batches)).map((r) => this.mapLeveragePositionData(r));
  }

  public async getPositionDataBatchedFromTo(tokenIdFrom: number, tokenIdTo: number): Promise<LeveragePositionData[]> {
    const result = await this.viewerModuleContract.getPositionData(tokenIdFrom, tokenIdTo);
    return result.map((r) => this.mapLeveragePositionData(r));
  }

  public async tokenIdNext(): Promise<number> {
    return (await this.leverageModuleContract.tokenIdNext()).toNumber();
  }

  private mapLeveragePositionData(result: any): LeveragePositionData {
    const positionData: LeveragePositionData = new LeveragePositionData();
    positionData.tokenId = result.tokenId;
    positionData.limitOrderPriceLowerThreshold = result.limitOrderPriceLowerThreshold;
    positionData.limitOrderPriceUpperThreshold = result.limitOrderPriceUpperThreshold;
    return positionData;
  }
}

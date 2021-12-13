import {
  BlocksResponse,
  BlockchainStateResponse,
  CoinResponse,
  CoinRecordResponse,
  NetspaceResponse,
  BlockResponse,
  BlockRecordResponse,
  PuzzleAndSolutionResponse,
  UnfinishedBlockHeadersResponse,
  AdditionsAndRemovalsResponse,
} from "./types/FullNode/RpcResponse";
import { ChiaOptions, RpcClient } from "./RpcClient";
import { Block } from "./types/FullNode/Block";

class FullNode extends RpcClient {
  public constructor(options: ChiaOptions) {
    super(options);
  }

  public async getBlockchainState(): Promise<BlockchainStateResponse> {
    return this.request<BlockchainStateResponse>("get_blockchain_state", {});
  }

  public async getNetworkSpace(
    newerBlockHeaderHash: string,
    olderBlockHeaderHash: string
  ): Promise<NetspaceResponse> {
    return this.request<NetspaceResponse>("get_network_space", {
      newer_block_header_hash: newerBlockHeaderHash,
      older_block_header_hash: olderBlockHeaderHash,
    });
  }

  public async getBlocks<B extends boolean>(
    start: number,
    end: number,
    excludeHeaderHash?: B
  ): Promise<BlocksResponse<Block>> {
    return this.request("get_blocks", {
      start,
      end,
      exclude_header_hash: excludeHeaderHash || false,
    });
  }

  public async getBlock(headerHash: string): Promise<BlockResponse> {
    return this.request<BlockResponse>("get_block", {
      header_hash: headerHash,
    });
  }

  public async getBlockRecordByHeight(
    height: number
  ): Promise<BlockRecordResponse> {
    return this.request<BlockRecordResponse>("get_block_record_by_height", {
      height,
    });
  }

  public async getBlockRecord(hash: string): Promise<BlockRecordResponse> {
    return this.request<BlockRecordResponse>("get_block_record", {
      header_hash: hash,
    });
  }

  public async getPuzzleAndSolution(
    coinId: string,
    height: number
  ): Promise<PuzzleAndSolutionResponse> {
    return this.request<PuzzleAndSolutionResponse>("get_puzzle_and_solution", {
      coin_id: coinId,
      height: height
    });
  }

  public async getUnfinishedBlockHeaders(
    height: number
  ): Promise<UnfinishedBlockHeadersResponse> {
    return this.request<UnfinishedBlockHeadersResponse>(
      "get_unfinished_block_headers",
      {
        height,
      }
    );
  }

  public async getUnspentCoins(
    puzzleHash: string,
    startHeight?: number,
    endHeight?: number
  ): Promise<CoinResponse> {
    return this.request<CoinResponse>("get_coin_records_by_puzzle_hash", {
      puzzle_hash: puzzleHash,
      start_height: startHeight,
      end_height: endHeight,
      include_spent_coins: false,
    });
  }

  public async getCoinRecordByName(name: string): Promise<CoinRecordResponse> {
    return this.request<CoinRecordResponse>("get_coin_record_by_name", {
      name,
    });
  }

  public async getAdditionsAndRemovals(
    hash: string
  ): Promise<AdditionsAndRemovalsResponse> {
    return this.request<AdditionsAndRemovalsResponse>(
      "get_additions_and_removals",
      {
        header_hash: hash,
      }
    );
  }

  public async getNetworkInfo(): Promise<{}> {
    return this.request<{}>("get_network_info", {});
  }
}

export { FullNode };

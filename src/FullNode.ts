import axios from 'axios';
import { BlockchainStateResponse } from './types/blockchain';
import { SubBlockResponse, SubBlockRecordResponse, UnfinishedSubBlockHeadersResponse } from './types/block';
import { CoinResponse } from './types/coin';
import { NetspaceResponse } from './types/netspace';
import { TipResponse } from './types/tip';
import { ChiaOptions, RpcClient } from './RpcClient';

const defaultProtocol = 'http';
const defaultHostname = 'localhost';
const defaultPort = 8555;

class FullNode extends RpcClient {
    public constructor(options?: Partial<ChiaOptions>) {
        super({
            protocol: options?.protocol || defaultProtocol,
            hostname: options?.hostname || defaultHostname,
            port: options?.port || defaultPort
        });
    }

    public async getBlockchainState(): Promise<BlockchainStateResponse> {
        return this.request<BlockchainStateResponse>('get_blockchain_state', {});
    };

    public async getNetworkSpace(newerBlockHeaderHash: string, olderBlockHeaderHash: string): Promise<NetspaceResponse> {
        return this.request<NetspaceResponse>('get_network_space', {
            newer_block_header_hash: newerBlockHeaderHash,
            older_block_header_hash: olderBlockHeaderHash
        });
    };

    public async getSubBlock(headerHash: string): Promise<SubBlockResponse> {
        return this.request<SubBlockResponse>('get_sub_block', {
            header_hash: headerHash
        });
    };

    public async getSubBlockRecordBySubHeight(height: number): Promise<SubBlockRecordResponse> {
        return this.request<SubBlockRecordResponse>('get_sub_block_record_by_sub_height', {
            height
        });
    };

    public async getSubBlockRecord(hash: string): Promise<SubBlockRecordResponse> {
        return this.request<SubBlockRecordResponse>('get_sub_block_record', {
            header_hash: hash
        });
    };

    public async getUnfinishedSubBlockHeaders(height: number): Promise<UnfinishedSubBlockHeadersResponse> {
        return this.request<UnfinishedSubBlockHeadersResponse>('get_unfinished_sub_block_headers', {
            height
        });
    };

    public async getUnspentCoins(puzzleHash: string, headerHash?: string): Promise<CoinResponse> {
        return this.request<CoinResponse>('get_unspent_coins', {
            puzzle_hash: puzzleHash,
            header_hash: headerHash
        });
    };

    public async getAdditionsAndRemovals(): Promise<TipResponse> {
        return this.request<TipResponse>('get_additions_and_removals', {});
    };
}

export { FullNode };

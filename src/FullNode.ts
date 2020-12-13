import axios from 'axios';
import { BlockchainStateResponse } from './types/blockchain';
import { BlockResponse, UnfinishedBlockHeadersResponse, HeaderResponse } from './types/block';
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

    public async getBlock(headerHash: string): Promise<BlockResponse> {
        return this.request<BlockResponse>('get_block', {
            header_hash: headerHash
        });
    };

    public async getHeaderByHeight(height: number): Promise<HeaderResponse> {
        return this.request<HeaderResponse>('get_header_by_height', {
            height
        });
    };

    public async getHeader(hash: string): Promise<HeaderResponse> {
        return this.request<HeaderResponse>('get_header', {
            header_hash: hash
        });
    };

    public async getUnfinishedBlockHeaders(height: number): Promise<UnfinishedBlockHeadersResponse> {
        return this.request<UnfinishedBlockHeadersResponse>('get_unfinished_block_headers', {
            height
        });
    };

    public async getUnspentCoins(puzzleHash: string, headerHash?: string): Promise<CoinResponse> {
        return this.request<CoinResponse>('get_unspent_coins', {
            puzzle_hash: puzzleHash,
            header_hash: headerHash
        });
    };

    public async getHeaviestBlockSeen(): Promise<TipResponse> {
        return this.request<TipResponse>('get_heaviest_block_seen', {});
    };
}

export { FullNode };

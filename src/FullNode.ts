import { BlocksResponse, BlockchainStateResponse, CoinResponse, NetspaceResponse, BlockResponse, BlockRecordResponse, UnfinishedBlockHeadersResponse, AdditionsAndRemovalsResponse } from './types/FullNode/RpcResponse';
import { ChiaOptions, RpcClient } from './RpcClient';
import { Block } from './types/FullNode/Block';
import { CertPathRequired } from './types/CertPathRequired';

const defaultProtocol = 'https';
const defaultHostname = 'localhost';
const defaultPort = 8555;

class FullNode extends RpcClient {
    public constructor(options: Partial<ChiaOptions> & CertPathRequired) {
        super({
            protocol: options?.protocol || defaultProtocol,
            hostname: options?.hostname || defaultHostname,
            port: options?.port || defaultPort,
            certPath: options.certPath,
            keyPath: options.keyPath
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
    }

    public async getBlocks<B extends boolean>(start: number, end: number, excludeHeaderHash?: B): Promise<BlocksResponse<Block>> {
        return this.request('get_blocks', {
            start,
            end,
            exclude_header_hash: excludeHeaderHash || false
        });
    }

    public async getBlock(headerHash: string): Promise<BlockResponse> {
        return this.request<BlockResponse>('get_block', {
            header_hash: headerHash
        });
    }

    public async getBlockRecordByHeight(height: number): Promise<BlockRecordResponse> {
        return this.request<BlockRecordResponse>('get_block_record_by_height', {
            height
        });
    }

    public async getBlockRecord(hash: string): Promise<BlockRecordResponse> {
        return this.request<BlockRecordResponse>('get_block_record', {
            header_hash: hash
        });
    }

    public async getUnfinishedBlockHeaders(height: number): Promise<UnfinishedBlockHeadersResponse> {
        return this.request<UnfinishedBlockHeadersResponse>('get_unfinished_block_headers', {
            height
        });
    }

    public async getUnspentCoins(puzzleHash: string, headerHash?: string): Promise<CoinResponse> {
        return this.request<CoinResponse>('get_unspent_coins', {
            puzzle_hash: puzzleHash,
            header_hash: headerHash
        });
    };

    public async getAdditionsAndRemovals(hash: string): Promise<AdditionsAndRemovalsResponse> {
        return this.request<AdditionsAndRemovalsResponse>('get_additions_and_removals', {
            header_hash: hash
        });
    }
}

export { FullNode };

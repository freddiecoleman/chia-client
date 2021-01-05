import { BlocksResponse, BlockchainStateResponse, CoinResponse, NetspaceResponse, SubBlockResponse, SubBlockRecordResponse, UnfinishedSubBlockHeadersResponse, AdditionsAndRemovalsResponse } from './types/FullNode/RpcResponse';
import { ChiaOptions, RpcClient } from './RpcClient';
import { Block, WithHeaderHash } from './types/FullNode/Block';
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
            certPath: options.certPath
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

    public async getBlocks<B extends boolean>(start: number, end: number, excludeHeaderHash?: B): Promise<BlocksResponse<Block> | BlocksResponse<Block & WithHeaderHash>> {
        return this.request('get_blocks', {
            start,
            end,
            exclude_header_hash: excludeHeaderHash || false
        });
    }

    public async getSubBlock(headerHash: string): Promise<SubBlockResponse> {
        return this.request<SubBlockResponse>('get_sub_block', {
            header_hash: headerHash
        });
    }

    public async getSubBlockRecordBySubHeight(subHeight: number): Promise<SubBlockRecordResponse> {
        return this.request<SubBlockRecordResponse>('get_sub_block_record_by_sub_height', {
            sub_height: subHeight
        });
    }

    public async getSubBlockRecord(hash: string): Promise<SubBlockRecordResponse> {
        return this.request<SubBlockRecordResponse>('get_sub_block_record', {
            header_hash: hash
        });
    }

    public async getUnfinishedSubBlockHeaders(subHeight: number): Promise<UnfinishedSubBlockHeadersResponse> {
        return this.request<UnfinishedSubBlockHeadersResponse>('get_unfinished_sub_block_headers', {
            sub_height: subHeight
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

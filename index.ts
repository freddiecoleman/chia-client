import axios from 'axios';
import { BlockchainStateResponse } from './src/types/blockchain';
import { BlockResponse, UnfinishedBlockHeadersResponse, HeaderResponse } from './src/types/block';
import { CoinResponse } from './src/types/coin';
import { NetspaceResponse } from './src/types/netspace';
import { TipResponse } from './src/types/tip';

const defaultProtocol = 'http';
const defaultHostname = 'localhost';
const defaultPort = 8555;

type Protocol = 'http' | 'https';

interface ChiaOptions {
    protocol?: Protocol;
    hostname?: string;
    port?: number;
}

export class ChiaClient {
    private protocol: Protocol; 
    private hostname: string;
    private port: number;

    public constructor(options?: ChiaOptions) {
        this.protocol = options?.protocol || defaultProtocol;
        this.hostname = options?.hostname || defaultHostname;
        this.port = options?.port || defaultPort;
    }

    public baseUri() {
        return `${this.protocol}://${this.hostname}:${this.port}`;
    };

    public updateOptions(options: ChiaOptions): void {
        this.protocol = options.protocol || this.protocol;
        this.hostname = options.hostname || this.hostname;
        this.port = options.port || this.port;
    };

    public async getBlockchainState(): Promise<BlockchainStateResponse> {
        const result = await axios.post<BlockchainStateResponse>(`${this.baseUri()}/get_blockchain_state`);

        return result.data;
    };

    public async getNetworkSpace(newerBlockHeaderHash: string, olderBlockHeaderHash: string): Promise<NetspaceResponse> {
        const result = await axios.post<NetspaceResponse>(`${this.baseUri()}/get_network_space`, {
            newer_block_header_hash: newerBlockHeaderHash,
            older_block_header_hash: olderBlockHeaderHash
        });

        return result.data;
    };

    public async getBlock(headerHash: string): Promise<BlockResponse> {
        const result = await axios.post<BlockResponse>(`${this.baseUri()}/get_block`, {
            header_hash: headerHash
        });

        return result.data;
    };

    public async getHeaderByHeight(height: number): Promise<HeaderResponse> {
        const result = await axios.post<HeaderResponse>(`${this.baseUri()}/get_header_by_height`, {
            height
        });

        return result.data;
    };

    public async getHeader(hash: string): Promise<HeaderResponse> {
        const result = await axios.post<HeaderResponse>(`${this.baseUri()}/get_header`, {
            header_hash: hash
        });

        return result.data;
    };

    public async getUnfinishedBlockHeaders(height: number): Promise<Array<UnfinishedBlockHeadersResponse>> {
        const result = await axios.post<Array<UnfinishedBlockHeadersResponse>>(`${this.baseUri()}/get_unfinished_block_headers`, {
            height
        });

        return result.data;
    };

    public async getUnspentCoins(puzzleHash: string, headerHash?: string): Promise<CoinResponse> {
        const result = await axios.post<CoinResponse>(`${this.baseUri()}/get_unspent_coins`, {
            puzzle_hash: puzzleHash,
            header_hash: headerHash
        });

        return result.data;
    };

    public async getHeaviestBlockSeen(): Promise<TipResponse> {
        const result = await axios.post<TipResponse>(`${this.baseUri()}/get_heaviest_block_seen`);

        return result.data;
    };

    public async stopNode(): Promise<void> {
        const result = await axios.post<void>(`${this.baseUri()}/stop_node`);

        return result.data;
    };
}

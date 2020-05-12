import axios from 'axios';
import { Block, BlockHeader } from './src/types/block';
import { Connection } from './src/types/connection';

const defaultProtocol = 'http';
const defaultHostname = 'localhost';
const defaultPort = 8555;

type Protocol = 'http' | 'https';

interface ChiaOptions {
    protocol?: Protocol;
    hostname?: string;
    port?: number;
}

interface BlockchainState {
    difficulty: number;
    ips: number;
    lca: BlockHeader;
    min_iters: number;
    sync_mode: boolean;
    tip_hashes: Array<string>;
    tips: Array<BlockHeader>;
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

    public async getBlockchainState(): Promise<BlockchainState> {
        const result = await axios.post<BlockchainState>(`${this.baseUri()}/get_blockchain_state`);

        return result.data;
    };

    public async getBlock(headerHash: string): Promise<Block> {
        const result = await axios.post<Block>(`${this.baseUri()}/get_block`, {
            header_hash: headerHash
        });

        return result.data;
    };

    public async getHeaderByHeight(height: number): Promise<BlockHeader> {
        const result = await axios.post<BlockHeader>(`${this.baseUri()}/get_header_by_height`, {
            height
        });

        return result.data;
    };

    public async getHeader(hash: string): Promise<BlockHeader> {
        const result = await axios.post<BlockHeader>(`${this.baseUri()}/get_header`, {
            header_hash: hash
        });

        return result.data;
    };

    public async getUnfinishedBlockHeaders(height: number): Promise<Array<BlockHeader>> {
        const result = await axios.post<Array<BlockHeader>>(`${this.baseUri()}/get_unfinished_block_headers`, {
            height
        });

        return result.data;
    };

    public async getConnections(): Promise<Array<Connection>> {
        const result = await axios.post<Array<Connection>>(`${this.baseUri()}/get_connections`);

        return result.data;
    };

    public async openConnection(host: string, port: number): Promise<void> {
        const result = await axios.post<void>(`${this.baseUri()}/open_connection`, {
            host,
            port
        });

        return result.data;
    };

    public async closeConnection(nodeId: string): Promise<void> {
        const result = await axios.post<void>(`${this.baseUri()}/close_connection`, {
            node_id: nodeId
        });

        return result.data;
    };

    public async getUnspentCoins(puzzleHash: string, headerHash?: string): Promise<void> {
        const result = await axios.post<void>(`${this.baseUri()}/get_unspent_coins`, {
            puzzle_hash: puzzleHash,
            header_hash: headerHash
        });

        return result.data;
    };

    public async getHeaviestBlockSeen(): Promise<BlockHeader> {
        const result = await axios.post<BlockHeader>(`${this.baseUri()}/get_heaviest_block_seen`);

        return result.data;
    };

    public async stopNode(): Promise<void> {
        const result = await axios.post<void>(`${this.baseUri()}/stop_node`);

        return result.data;
    };
}

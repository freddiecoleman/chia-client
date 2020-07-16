import { createHash } from 'crypto';
import axios from 'axios';
import { BlockchainStateResponse } from './src/types/blockchain';
import { BlockResponse, BlockHeader, UnfinishedBlockHeadersResponse, HeaderResponse } from './src/types/block';
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

function unix_to_short_date(unix_timestamp: number) {
    let d = new Date(unix_timestamp * 1000)
    return d.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        }) + " " + d.toLocaleTimeString();
}

function big_int_to_array(x: bigint, num_bytes: number) {
    let truncated = BigInt.asUintN(num_bytes * 8, x);
    const arr: number[] = [];

    for (let i = 0; i < num_bytes; i++) {
        arr.splice(0, 0, Number(truncated & BigInt(255)));
        truncated >>= BigInt(8);
    }
    return arr;
}

function hex_to_array(hexString: string) {
    hexString = hexString.slice(2);
    const arr = []
    for (var i = 0; i < hexString.length; i += 2) {
        arr.push(parseInt(hexString.substr(i, 2), 16));
    }
    return arr;
}

function arr_to_hex(buffer: Buffer) { // buffer is an ArrayBuffer
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

/**
 * Copied from chia-blockchain repo. Check there for changes.
 */
const hashHeader = (header: BlockHeader) => {
    var buf = big_int_to_array(BigInt(header.data.height), 4);
    buf = buf.concat(hex_to_array(header.data.prev_header_hash));
    buf = buf.concat(big_int_to_array(BigInt(header.data.timestamp), 8));
    buf = buf.concat(hex_to_array(header.data.filter_hash));
    buf = buf.concat(hex_to_array(header.data.proof_of_space_hash));
    buf = buf.concat(big_int_to_array(BigInt(header.data.weight), 16));
    buf = buf.concat(big_int_to_array(BigInt(header.data.total_iters), 8));
    buf = buf.concat(hex_to_array(header.data.additions_root));
    buf = buf.concat(hex_to_array(header.data.removals_root));
    buf = buf.concat(hex_to_array(header.data.farmer_rewards_puzzle_hash));
    buf = buf.concat(
        big_int_to_array(BigInt(header.data.total_transaction_fees), 8)
    );
    buf = buf.concat(hex_to_array(header.data.pool_target.puzzle_hash));
    buf = buf.concat(
        big_int_to_array(BigInt(header.data.pool_target.max_height), 4)
    );
    buf = buf.concat(hex_to_array(header.data.aggregated_signature));
    buf = buf.concat(big_int_to_array(BigInt(header.data.cost), 8));
    buf = buf.concat(hex_to_array(header.data.extension_data));
    buf = buf.concat(hex_to_array(header.data.generator_hash));
    buf = buf.concat(hex_to_array(header.plot_signature));

    const hash = createHash('sha256');

    hash.update(new Uint8Array(buf));

    const headerHash = hash.digest();

    return arr_to_hex(headerHash);
};

const generatePlotId = (poolPubKey: string, plotPubKey: string) => {
    const combinedPubKeys = Buffer.concat([
        Buffer.from(poolPubKey.slice(2), 'hex'),
        Buffer.from(plotPubKey.slice(2), 'hex')
    ]);
    const hash = createHash('sha256');

    hash.update(combinedPubKeys);

    const plotId = hash.digest();

    return plotId.toString('hex');
};

class ChiaClient {
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
        const result = await axios.post<BlockchainStateResponse>(`${this.baseUri()}/get_blockchain_state`, {});

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

    public async getUnfinishedBlockHeaders(height: number): Promise<UnfinishedBlockHeadersResponse> {
        const result = await axios.post<UnfinishedBlockHeadersResponse>(`${this.baseUri()}/get_unfinished_block_headers`, {
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
        const result = await axios.post<TipResponse>(`${this.baseUri()}/get_heaviest_block_seen`, {});

        return result.data;
    };
}

export {
    ChiaClient,
    hashHeader,
    generatePlotId
};

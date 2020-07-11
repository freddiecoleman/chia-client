import { RpcResponse } from './rpc';

export interface BlockHeader {
    data: {
        additions_root: string;
        aggregated_signature: { sig: string; };
        cost: string;
        extension_data: string;
        farmer_rewards_puzzle_hash: string;
        filter_hash: string;
        generator_hash: string;
        height: number;
        pool_target: {
            max_height: number;
            puzzle_hash: string;
        };
        prev_header_hash: string;
        proof_of_space_hash: string;
        removals_root: string;
        timestamp: string;
        total_iters: string;
        total_transaction_fees: string;
        weight: string;
    };
    harvester_signature: string;
}

export interface ProofOfSpace {
    challenge_hash: string;
    plot_public_key: string;
    pool_public_key: string;
    proof: string;
    size: number;
}

export interface ProofOfTime {
    challenge_hash: string;
    number_of_iterations: string;
    output: {
        a: string;
        b: string;
    };
    witness: string;
    witness_type: number;
}

export interface Block {
    header: BlockHeader;
    proof_of_space: ProofOfSpace;
    proof_of_time: ProofOfTime;
    transactions_filter: null | string;
    transactions_generator: null | string;
}


export interface UnfinishedBlockHeadersResponse extends RpcResponse {
    headers: BlockHeader[];
}

export interface HeaderResponse extends RpcResponse {
    header: BlockHeader;
}

export interface BlockResponse extends RpcResponse {
    block: Block;
}
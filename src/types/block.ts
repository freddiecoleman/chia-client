export interface BlockHeader {
    data: {
        additions_root: string;
        aggregated_signature: null | string;
        coinbase: {
            amount: number;
            parent_coin_info: string;
            puzzle_hash: string;
        },
        coinbase_signature: {
            sig: string;
        },
        cost: number;
        extension_data: string;
        fees_coin: {
            amount: number;
            parent_coin_info: string;
            puzzle_hash: string;
        },
        filter_hash: string;
        generator_hash: string;
        height: number;
        prev_header_hash: string;
        proof_of_space_hash: string;
        removals_root: string;
        timestamp: number;
        total_iters: number;
        weight: number;
    };
    harvester_signature: string;
}

export interface ProofOfSpace {
    challenge_hash: string;
    plot_pubkey: string;
    pool_pubkey: string;
    proof: string;
    size: number;
}

export interface ProofOfTime {
    challenge_hash: string;
    number_of_iterations: number;
    output: { [key: string]: string; };
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

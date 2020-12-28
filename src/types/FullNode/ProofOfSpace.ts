export interface ProofOfSpace {
    challenge: string;
    plot_public_key: string;
    pool_contract_puzzle_hash: string | null;
    pool_public_key: string;
    proof: string;
    size: number;
}

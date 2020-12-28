import { RpcResponse } from './rpc';

export interface Proof {
    witness: string;
    witness_type: number;
}

export interface Vdf {
    challenge: string;
    number_of_iterations: string;
    output: {
        a: string;
        b: string;
    }
}

export interface RewardClaim {
    amount: string;
    parent_coin_info: string;
    puzzle_hash: string;
}

export interface BlockchainState {
    difficulty: number;
    peak: {
        challenge_chain_ip_proof: Proof;
        challenge_chain_sp_proof: Proof;
        finished_sub_slots: string[]; // Todo: correct type for this
        foliage_block: {
            additions_root: string;
            filter_hash: string;
            height: number;
            prev_block_hash: string;
            removals_root: string;
            timestamp: string;
            transactions_info_hash: string;
        };
        foliage_sub_block: {
            foliage_block_hash: string;
            foliage_block_signature: string;
            foliage_sub_block_data: {
                extension_data: string;
                farmer_reward_puzzle_hash: string;
                pool_signature: string;
                pool_target: {
                    max_height: number;
                    puzzle_hash: string;
                };
                unfinished_reward_block_hash: string;
            };
            foliage_sub_block_signature: string;
            prev_sub_block_hash: string;
            reward_block_hash: string;
        };
        infused_challenge_chain_ip_proof: Proof;
        reward_chain_ip_proof: Proof;
        reward_chain_sp_proof: Proof;
        reward_chain_sub_block: {
            challenge_chain_ip_vdf: Vdf;
            challenge_chain_sp_signature: string;
            challenge_chain_sp_vdf: Vdf;
            infused_challenge_chain_ip_vdf: Vdf;
            is_block: boolean;
            pos_ss_cc_challenge_hash: string;
            proof_of_space: {
                challenge: string;
                plot_public_key: string;
                pool_contract_puzzle_hash: string | null;
                pool_public_key: string;
                proof: string;
                size: number;
            };
            reward_chain_ip_vdf: Vdf;
            reward_chain_sp_signature: string;
            reward_chain_sp_vdf: Vdf;
            signage_point_index: number;
            sub_block_height: number;
            total_iters: string;
            weight: string;
        };
        transactions_generator: null;
        transactions_info: {
            aggregated_signature: string;
            cost: string;
            fees: string;
            generator_root: string;
            previous_generators_root: string;
            reward_claims_incorporated: RewardClaim[];
        };
    };
    space: number;
    sub_slot_iters: number;
    sync: {
        sync_mode: boolean;
        sync_progress_height: number;
        sync_tip_height: number;
    }
}

export interface BlockchainStateResponse extends RpcResponse {
    blockchain_state: BlockchainState;
    success: boolean;
}

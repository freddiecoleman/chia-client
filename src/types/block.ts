import { FoliageBlock } from './FoliageBlock';
import { FoliageSubBlock } from './FoliageSubBlock';
import { Proof } from './Proof';
import { RewardClaim } from './RewardClaim';
import { SubSlot } from './SubSlot';
import { Vdf } from './Vdf';

export interface Block {
    challenge_chain_ip_proof: Proof;
    challenge_chain_sp_proof: Proof;
    finished_sub_slots: SubSlot[];
    foliage_block: FoliageBlock;
    foliage_sub_block: FoliageSubBlock;
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
}

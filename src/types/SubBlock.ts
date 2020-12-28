import { ProofOfSpace } from './ProofOfSpace';
import { Vdf } from './Vdf';

export interface SubBlock {
    challenge_chain_ip_vdf: Vdf;
    challenge_chain_sp_signature: string;
    challenge_chain_sp_vdf: Vdf;
    infused_challenge_chain_ip_vdf: Vdf;
    is_block: boolean;
    pos_ss_cc_challenge_hash: string;
    proof_of_space: ProofOfSpace;
    reward_chain_ip_vdf: Vdf;
    reward_chain_sp_signature: string;
    reward_chain_sp_vdf: Vdf;
    signage_point_index: number;
    sub_block_height: number;
    total_iters: string;
    weight: string;
}

import { Proof } from './Proof';
import { Vdf } from './Vdf';

export interface SubSlot {
    challenge_chain: {
        challenge_chain_end_of_slot_vdf: Vdf;
        infused_challenge_chain_sub_slot_hash: string;
        new_difficulty: string | null;
        new_sub_slot_iters: string | null;
        subepoch_summary_hash: string | null;
    };
    infused_challenge_chain: {
        infused_challenge_chain_end_of_slot_vdf: Vdf;
    };
    proofs: {
        challenge_chain_slot_proof: Proof;
        infused_challenge_chain_slot_proof: Proof;
        reward_chain_slot_proof: Proof;
    };
    reward_chain: {
        challenge_chain_sub_slot_hash: string;
        deficit: number;
        end_of_slot_vdf: Vdf;
        infused_challenge_chain_sub_slot_hash: string;
    }
}

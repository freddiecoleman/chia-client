import { VdfOutput } from "./Vdf";

export interface SubBlockRecord {
    challenge_block_info_hash: string;
    challenge_vdf_output: VdfOutput;
    deficit: number;
    farmer_puzzle_hash: string;
    fees: string | null;
    finished_challenge_slot_hashes: string[] | null;
    finished_infused_challenge_slot_hashes: string[] | null;
    finished_reward_slot_hashes: string[] | null;
    header_hash: string;
    height: number;
    infused_challenge_vdf_output: VdfOutput;
    overflow: boolean;
    pool_puzzle_hash: string;
    prev_block_hash: string | null;
    prev_hash: string;
    required_iters: string;
    reward_infusion_new_challenge: string;
    signage_point_index: number;
    sub_block_height: number;
    sub_epoch_summary_included: null;
    sub_slot_iters: string;
    timestamp: string | null;
    total_iters: string;
    weight: string;
}

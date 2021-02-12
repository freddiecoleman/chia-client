import { RewardClaim } from "./RewardClaim";
import { VdfOutput } from "./Vdf";

export interface BlockRecord {
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
    prev_transaction_block_height: number;
    required_iters: string;
    // Only transaction blocks have reward claims
    reward_claims_incorporated: RewardClaim[] | null;
    reward_infusion_new_challenge: string;
    signage_point_index: number;
    sub_epoch_summary_included: null;
    sub_slot_iters: string;
    // Only transaction blocks have timestamp
    timestamp: string | null;
    total_iters: string;
    weight: string;
}

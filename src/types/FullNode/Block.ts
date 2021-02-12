import { FoliageBlock } from './FoliageBlock';
import { FoliageSubBlock } from './FoliageSubBlock';
import { Proof } from './Proof';
import { RewardChainSubBlock } from './RewardChainSubBlock';
import { SubSlot } from './SubSlot';
import { TransactionsInfo } from './TransactionsInfo';

export interface Block {
    challenge_chain_ip_proof: Proof;
    challenge_chain_sp_proof: Proof;
    finished_sub_slots: SubSlot[];
    foliage_block: FoliageBlock;
    foliage_sub_block: FoliageSubBlock;
    infused_challenge_chain_ip_proof: Proof;
    reward_chain_ip_proof: Proof;
    reward_chain_sp_proof: Proof;
    reward_chain_sub_block: RewardChainSubBlock;
    transactions_generator: null;
    // Only present on transaction block
    transactions_info: TransactionsInfo | null;
    // Only present if requested by client
    header_hash?: string;
}

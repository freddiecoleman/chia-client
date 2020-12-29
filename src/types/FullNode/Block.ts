import { FoliageBlock } from './FoliageBlock';
import { FoliageSubBlock } from './FoliageSubBlock';
import { Proof } from './Proof';
import { SubBlock } from './SubBlock';
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
    reward_chain_sub_block: SubBlock;
    transactions_generator: null;
    transactions_info: TransactionsInfo;
}

export interface WithHeaderHash {
    header_hash: string;
}

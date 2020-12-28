import { Block } from './Block';

export interface BlockchainState {
    difficulty: number;
    peak: Block;
    space: number;
    sub_slot_iters: number;
    sync: {
        sync_mode: boolean;
        sync_progress_height: number;
        sync_tip_height: number;
    }
}

import { Block } from './Block';
import { SubBlockRecord } from './SubBlockRecord';

export interface BlockchainState {
    difficulty: number;
    peak: SubBlockRecord;
    space: number;
    mempool_size: number;
    sub_slot_iters: number;
    sync: {
        sync_mode: boolean;
        sync_progress_height: number;
        sync_tip_height: number;
    }
}

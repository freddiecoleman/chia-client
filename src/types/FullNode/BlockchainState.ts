import { Block } from './Block';
import { BlockRecord } from './BlockRecord';

export interface BlockchainState {
    difficulty: number;
    peak: BlockRecord;
    space: number;
    mempool_size: number;
    sub_slot_iters: number;
    sync: {
        sync_mode: boolean;
        sync_progress_height: number;
        sync_tip_height: number;
        synced: boolean;
    }
}

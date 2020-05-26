import { RpcResponse } from './rpc';
import { BlockHeader } from './block';

export interface BlockchainState {
    difficulty: number;
    ips: number;
    lca: BlockHeader;
    min_iters: number;
    space: number;
    sync: {
        sync_mode: boolean;
        sync_progress_height: number;
        sync_tip_height: number;
    }
    tip_hashes: Array<string>;
    tips: Array<BlockHeader>;
}

export interface BlockchainStateResponse extends RpcResponse {
    blockchain_state: BlockchainState;
}

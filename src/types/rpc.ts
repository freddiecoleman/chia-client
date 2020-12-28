import { Block, BlockHeader } from './Block';
import { BlockchainState } from './BlockchainState';
import { SubBlockRecord } from './SubBlockRecord';
import { CoinRecord } from './coin';

export interface RpcResponse {
    success: boolean;
}

export interface BlockchainStateResponse extends RpcResponse {
    blockchain_state: BlockchainState;
}

export interface UnfinishedSubBlockHeadersResponse extends RpcResponse {
    headers: BlockHeader[];
}

export interface HeaderResponse extends RpcResponse {
    header: BlockHeader;
}

export interface BlocksResponse extends RpcResponse {
    blocks: Block[];
}

export interface SubBlockResponse extends RpcResponse {
    sub_block: Block;
}

export interface SubBlockRecordResponse extends RpcResponse {
    sub_block_record: SubBlockRecord;
}

export interface AdditionsAndRemovalsResponse extends RpcResponse {
    additions: Array<CoinRecord>;
    removals: Array<CoinRecord>;
}

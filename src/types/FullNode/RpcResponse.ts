import { Block } from './Block';
import { BlockHeader } from './BlockHeader';
import { CoinRecord } from './CoinRecord';
import { BlockchainState } from './BlockchainState';
import { BlockRecord } from './BlockRecord';
import { RpcResponse } from '../RpcResponse';

export interface BlockchainStateResponse extends RpcResponse {
    blockchain_state: BlockchainState;
}

export interface UnfinishedBlockHeadersResponse extends RpcResponse {
    headers: BlockHeader[];
}

export interface HeaderResponse extends RpcResponse {
    header: BlockHeader;
}

export interface BlocksResponse<T extends Block> extends RpcResponse {
    blocks: T[];
}

export interface BlockResponse extends RpcResponse {
    block: Block;
}

export interface BlockRecordResponse extends RpcResponse {
    block_record: BlockRecord;
}

export interface CoinResponse extends RpcResponse {
    coin_records: Array<CoinRecord>;
}

export interface CoinRecordResponse extends RpcResponse {
    coin_record: CoinRecord;
}
export interface AdditionsAndRemovalsResponse extends RpcResponse {
    additions: Array<CoinRecord>;
    removals: Array<CoinRecord>;
}

export interface NetspaceResponse extends RpcResponse {
    space: number;
}

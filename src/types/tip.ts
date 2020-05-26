import { RpcResponse } from './rpc';
import { BlockHeader } from './block';

export interface TipResponse extends RpcResponse {
    tip: BlockHeader;
}

import { RpcResponse } from '../RpcResponse';
import { Plot } from './Plot';

export interface PlotsResponse extends RpcResponse {
    failed_to_open_filenames: string[];
    not_found_filenames: string[];
    plots: Plot[];
}

export interface PlotDirectoriesResponse extends RpcResponse {
    directories: string[];
}

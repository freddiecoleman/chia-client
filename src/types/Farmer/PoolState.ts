import { PoolConfig } from './PoolConfig';
import { PoolError } from './PoolError';

export interface PoolState {
  authentication_token_timeout: number;
  current_difficulty: number;
  current_points: number;
  next_farmer_update: number;
  next_pool_info_update: number;
  p2_singleton_puzzle_hash: string;
  points_acknowledged_24h: number[][];
  points_acknowledged_since_start: number;
  points_found_24h: number[][];
  points_found_since_start: number;
  pool_config: PoolConfig;
  pool_errors_24h: PoolError[];
}
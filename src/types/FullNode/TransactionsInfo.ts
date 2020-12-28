import { RewardClaim } from './RewardClaim';

export interface TransactionsInfo {
    aggregated_signature: string;
    cost: string;
    fees: string;
    generator_root: string;
    previous_generators_root: string;
    reward_claims_incorporated: RewardClaim[];
}

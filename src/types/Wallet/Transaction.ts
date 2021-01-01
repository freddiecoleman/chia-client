import { Coin } from "./Coin";
import { SpendBundle } from "./SpendBundle";

export interface Transaction {
    confirmed_at_index: number;
    created_at_time: number;
    to_address: string;
    amount: number;
    fee_amount: number;
    incoming: boolean;
    confirmed: boolean;
    sent: number;
    spend_bundle?: SpendBundle;
    additions: Coin[];
    removals: Coin[];
    wallet_id: number;
};

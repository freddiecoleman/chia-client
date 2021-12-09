import { Coin } from "./Coin";

export interface CoinRecord {
    coin: Coin;
    coinbase: boolean;
    confirmed_block_index: number;
    spent: boolean;
    spent_block_index: number;
    timestamp: string;
};

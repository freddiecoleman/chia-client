export interface Coin {
    coin: {
        amount: string;
        parent_coin_info: string;
        puzzle_hash: string;
    };
    coinbase: boolean;
    confirmed_block_index: number;
    spent: boolean;
    spent_block_index: number;
}

import { Coin } from "./Coin";

export interface CoinSpend {
    coin: Coin;
    puzzle_reveal: string;
    solution: string;
}

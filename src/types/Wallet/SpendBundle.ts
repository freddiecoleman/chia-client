import { CoinSolution } from "./CoinSolution";

export interface SpendBundle {
    coin_solutions: CoinSolution[];
    aggregated_signature: string;
}

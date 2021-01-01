export interface WalletBalance {
    wallet_id: number;
    confirmed_wallet_balance: number;
    unconfirmed_wallet_balance: number;
    spendable_balance: number;
    frozen_balance: number;
    pending_change: number;
}

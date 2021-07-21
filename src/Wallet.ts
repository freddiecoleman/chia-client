import { getChiaConfig, getChiaFilePath } from "./ChiaNodeUtils";
import { ChiaOptions, RpcClient } from "./RpcClient";
import { CertPath } from "./types/CertPath";
import {
  AddKeyResponse,
  GenerateMnemonicResponse,
  HeightResponse,
  LoginResponse,
  NextAddressResponse,
  PrivateKeyResponse,
  PublicKeysResponse,
  SyncStatusResponse,
  TransactionResponse,
  TransactionsResponse,
  WalletBalanceResponse,
  WalletsResponse,
} from "./types/Wallet/RpcResponse";
import { Transaction } from "./types/Wallet/Transaction";
import { WalletBalance } from "./types/Wallet/WalletBalance";
import { WalletInfo } from "./types/Wallet/WalletInfo";
// @ts-ignore
import { address_to_puzzle_hash, puzzle_hash_to_address, get_coin_info } from "chia-utils";

const chiaConfig = getChiaConfig();
const defaultProtocol = "https";
const defaultHostname = chiaConfig?.self_hostname || "localhost";
const defaultPort = chiaConfig?.wallet.rpc_port || 9256;
const host = "https://backup.chia.net";

const defaultCaCertPath = chiaConfig?.private_ssl_ca.crt;
const defaultCertPath = chiaConfig?.daemon_ssl.private_crt;
const defaultCertKey = chiaConfig?.daemon_ssl.private_key;

class Wallet extends RpcClient {
  public constructor(options?: Partial<ChiaOptions> & CertPath) {
    super({
      protocol: options?.protocol || defaultProtocol,
      hostname: options?.hostname || defaultHostname,
      port: options?.port || defaultPort,
      caCertPath: options?.caCertPath || getChiaFilePath(defaultCaCertPath),
      certPath: options?.certPath || getChiaFilePath(defaultCertPath),
      keyPath: options?.keyPath || getChiaFilePath(defaultCertKey),
    });
  }

  public async logIn(fingerprint: number): Promise<LoginResponse> {
    return this.request<LoginResponse>("log_in", {
      host,
      fingerprint,
      type: "start",
    });
  }

  public async logInAndRestore(
    fingerprint: number,
    filePath: string
  ): Promise<LoginResponse> {
    return this.request<LoginResponse>("log_in", {
      host,
      fingerprint,
      type: "restore_backup",
      file_path: filePath,
    });
  }

  public async logInAndSkip(fingerprint: number): Promise<LoginResponse> {
    return this.request<LoginResponse>("log_in", {
      host,
      fingerprint,
      type: "skip",
    });
  }

  public async getPublicKeys(): Promise<string[]> {
    const { public_key_fingerprints } = await this.request<PublicKeysResponse>(
      "get_public_keys",
      {}
    );

    return public_key_fingerprints;
  }

  public async getPrivateKey(fingerprint: number): Promise<string[]> {
    const { private_key } = await this.request<PrivateKeyResponse>(
      "get_private_key",
      { fingerprint }
    );

    return private_key;
  }

  public async generateMnemonic(): Promise<string[]> {
    const { mnemonic } = await this.request<GenerateMnemonicResponse>(
      "generate_mnemonic",
      {}
    );

    return mnemonic;
  }

  public async addKey(
    mnemonic: string[],
    type: string = "new_wallet"
  ): Promise<AddKeyResponse> {
    return this.request<AddKeyResponse>("add_key", {
      mnemonic,
      type,
    });
  }

  public async deleteKey(fingerprint: number): Promise<{}> {
    return this.request<{}>("delete_key", { fingerprint });
  }

  public async deleteAllKeys(): Promise<{}> {
    return this.request<{}>("delete_all_keys", {});
  }

  public async getSyncStatus(): Promise<boolean> {
    const { syncing } = await this.request<SyncStatusResponse>(
      "get_sync_status",
      {}
    );

    return syncing;
  }

  public async getHeightInfo(): Promise<number> {
    const { height } = await this.request<HeightResponse>(
      "get_height_info",
      {}
    );

    return height;
  }

  public async farmBlock(address: string): Promise<{}> {
    return this.request<{}>("farm_block", { address });
  }

  public async getWallets(): Promise<WalletInfo[]> {
    const { wallets } = await this.request<WalletsResponse>("get_wallets", {});

    return wallets;
  }

  public async getWalletBalance(walletId: string): Promise<WalletBalance> {
    const { wallet_balance } = await this.request<WalletBalanceResponse>(
      "get_wallet_balance",
      { wallet_id: walletId }
    );

    return wallet_balance;
  }

  public async getTransaction(
    walletId: string,
    transactionId: string
  ): Promise<Transaction> {
    const { transaction } = await this.request<TransactionResponse>(
      "get_transaction",
      {
        wallet_id: walletId,
        transaction_id: transactionId,
      }
    );

    return transaction;
  }

  public async getTransactions(walletId: string, limit: number): Promise<Transaction[]> {
    const { transactions } = await this.request<TransactionsResponse>(
      "get_transactions",
      { wallet_id: walletId, end: limit }
    );

    return transactions;
  }

  public async getNextAddress(walletId: string): Promise<string> {
    const { address } = await this.request<NextAddressResponse>(
      "get_next_address",
      { wallet_id: walletId, new_address: true}
    );

    return address;
  }

  public async sendTransaction(
    walletId: string,
    amount: number,
    address: string,
    fee: number
  ): Promise<Transaction> {
    const { transaction } = await this.request<TransactionResponse>(
      "send_transaction",
      {
        wallet_id: walletId,
        amount,
        address,
        fee,
      }
    );

    return transaction;
  }

  public async sendTransactionMulti(
    walletId: string,
    additions: { address: string, amount: number }[],
    fee: number
  ): Promise<Transaction> {

    const additionWithPuzzleHash = additions.map(addition => ({
      puzzle_hash: address_to_puzzle_hash(addition.address),
      amount: addition.amount
    }))

    const { transaction } = await this.request(
      "send_transaction_multi",
      {
        wallet_id: walletId,
        additions: additionWithPuzzleHash,
        fee,
      }
    );

    return transaction;
  }

  public async createBackup(filePath: string): Promise<{}> {
    return this.request<{}>("create_backup", { file_path: filePath });
  }
  
  /* https://github.com/CMEONE/chia-utils */
  public addressToPuzzleHash(address: string): string {
    return address_to_puzzle_hash(address);
  }
  
  public puzzleHashToAddress(puzzleHash: string): string {
    return puzzle_hash_to_address(puzzleHash);
  }
  
  public getCoinInfo(parentCoinInfo: string, puzzleHash: string, amount: number): string {
    return get_coin_info(parentCoinInfo, puzzleHash, amount / 1000000000000);
  }
}

export { Wallet };

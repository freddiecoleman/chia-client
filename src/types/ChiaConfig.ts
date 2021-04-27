export interface ChiaConfig {
  ALERTS_URL: string;
  CHIA_ALERTS_PUBKEY: string;
  chia_ssl_ca: SslCa;
  daemon_port: number;
  daemon_ssl: SslCerts;
  farmer: Farmer;
  full_node: FullNode;
  harvester: Harvester;
  inbound_rate_limit_percent: number;
  introducer: Introducer;
  logging: Logging;
  min_mainnet_k_size: number;
  network_overrides: NetworkOverrides;
  outbound_rate_limit_percent: number;
  ping_interval: number;
  pool: Pool;
  private_ssl_ca: SslCa;
  selected_network: string;
  self_hostname: string;
  timelord: Timelord;
  timelord_launcher: TimelordLauncher;
  ui: Ui;
  wallet: Wallet;
}

export interface SslCa {
  crt: string;
  key: string;
}

export interface SslCerts {
  private_crt: string;
  private_key: string;
}

export interface Farmer {
  full_node_peer: PeerHost;
  harvester_peer: PeerHost;
  logging: Logging;
  network_overrides: NetworkOverrides;
  pool_public_keys?: null;
  pool_share_threshold: number;
  port: number;
  rpc_port: number;
  selected_network: string;
  ssl: Ssl;
  start_rpc_server: boolean;
  xch_target_address: string;
}

export interface PeerHost {
  host: string;
  port: number;
}

export interface Logging {
  log_filename: string;
  log_level: string;
  log_stdout: boolean;
}

export interface NetworkOverrides {
  config: Config;
  constants: Constants;
}

export interface Config {
  mainnet: MainnetOrTestnet0;
  testnet0: MainnetOrTestnet0;
}

export interface MainnetOrTestnet0 {
  address_prefix: string;
}

export interface Constants {
  mainnet: Mainnet;
  testnet0: Testnet0;
}

export interface Mainnet {
  GENESIS_CHALLENGE: string;
  GENESIS_PRE_FARM_FARMER_PUZZLE_HASH: string;
  GENESIS_PRE_FARM_POOL_PUZZLE_HASH: string;
  NETWORK_TYPE: number;
}

export interface Testnet0 {
  GENESIS_CHALLENGE: string;
  GENESIS_PRE_FARM_FARMER_PUZZLE_HASH: string;
  GENESIS_PRE_FARM_POOL_PUZZLE_HASH: string;
  MIN_PLOT_SIZE: number;
  NETWORK_TYPE: number;
}

export interface Ssl {
  private_crt: string;
  private_key: string;
  public_crt: string;
  public_key: string;
}

export interface FullNode {
  database_path: string;
  enable_upnp: boolean;
  farmer_peer: PeerHost;
  introducer_peer: PeerHost;
  logging: Logging;
  max_inbound_farmer: number;
  max_inbound_timelord: number;
  max_inbound_wallet: number;
  network_overrides: NetworkOverrides;
  peer_connect_interval: number;
  peer_db_path: string;
  port: number;
  recent_peer_threshold: number;
  rpc_port: number;
  selected_network: string;
  send_uncompact_interval: number;
  short_sync_blocks_behind_threshold: number;
  simulator_database_path: string;
  simulator_peer_db_path: string;
  ssl: Ssl;
  start_rpc_server: boolean;
  sync_blocks_behind_threshold: number;
  target_outbound_peer_count: number;
  target_peer_count: number;
  target_uncompact_proofs: number;
  timelord_peer: PeerHost;
  wallet_peer: PeerHost;
  weight_proof_timeout: number;
}

export interface Harvester {
  chia_ssl_ca: SslCa;
  farmer_peer: PeerHost;
  logging: Logging;
  network_overrides: NetworkOverrides;
  num_threads: number;
  plot_directories?: string[] | null;
  port: number;
  private_ssl_ca: SslCa;
  rpc_port: number;
  selected_network: string;
  ssl: SslCerts;
  start_rpc_server: boolean;
}

export interface Introducer {
  host: string;
  logging: Logging;
  max_peers_to_send: number;
  network_overrides: NetworkOverrides;
  port: number;
  recent_peer_threshold: number;
  selected_network: string;
  ssl: Ssl1;
}

export interface Ssl1 {
  public_crt: string;
  public_key: string;
}

export interface Pool {
  logging: Logging;
  network_overrides: NetworkOverrides;
  selected_network: string;
  xch_target_address: string;
}

export interface Timelord {
  fast_algorithm: boolean;
  full_node_peer: PeerHost;
  logging: Logging;
  max_connection_time: number;
  network_overrides: NetworkOverrides;
  port: number;
  sanitizer_mode: boolean;
  selected_network: string;
  ssl: Ssl;
  vdf_clients: VdfClients;
  vdf_server: PeerHost;
}

export interface VdfClients {
  ip?: string[] | null;
  ips_estimate?: number[] | null;
}

export interface TimelordLauncher {
  logging: Logging;
  port: number;
  process_count: number;
}

export interface Ui {
  daemon_host: string;
  daemon_port: number;
  daemon_ssl: SslCerts;
  logging: Logging;
  network_overrides: NetworkOverrides;
  port: number;
  rpc_port: number;
  selected_network: string;
  ssh_filename: string;
}

export interface Wallet {
  database_path: string;
  full_node_peer: PeerHost;
  initial_num_public_keys: number;
  initial_num_public_keys_new_wallet: number;
  introducer_peer: PeerHost;
  logging: Logging;
  network_overrides: NetworkOverrides;
  num_sync_batches: number;
  peer_connect_interval: number;
  port: number;
  recent_peer_threshold: number;
  rpc_port: number;
  selected_network: string;
  ssl: Ssl;
  start_height_buffer: number;
  starting_height: number;
  target_peer_count: number;
  testing: boolean;
  trusted_peers: TrustedPeers;
  wallet_peers_path: string;
}

export interface TrustedPeers {
  public_crt: string;
}

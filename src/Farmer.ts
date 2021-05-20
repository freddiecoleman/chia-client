import { 
  RewardTargetResponse,
  SignagePointResponse,
  SignagePointsResponse
} from "./types/Farmer/RpcResponse";
import { CertPath } from "./types/CertPath";
import { getChiaConfig, getChiaFilePath } from "./ChiaNodeUtils";
import { ChiaOptions, RpcClient } from "./RpcClient";
import { RpcResponse } from "./types/RpcResponse";

const chiaConfig = getChiaConfig();
const defaultProtocol = "https";
const defaultHostname = chiaConfig?.self_hostname || "localhost";
const defaultPort = chiaConfig?.farmer.rpc_port || 8559;
const defaultCaCertPath = chiaConfig?.private_ssl_ca.crt;
const defaultCertPath = chiaConfig?.daemon_ssl.private_crt;
const defaultCertKey = chiaConfig?.daemon_ssl.private_key;

class Farmer extends RpcClient {
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

  public async getSignagePoint(
    signagePointHash: string
  ): Promise<SignagePointResponse> {
    return this.request<SignagePointResponse>("get_signage_point", {
      sp_hash: signagePointHash,
    });
  }

  public async getSignagePoints(): Promise<SignagePointsResponse> {
    return this.request<SignagePointsResponse>("get_signage_points", {});
  }

  public async getRewardTarget(
    searchForPrivateKey: boolean
  ): Promise<RewardTargetResponse> {
    return this.request<RewardTargetResponse>("get_reward_targets", {
      search_for_private_key: searchForPrivateKey,
    });
  }

  public async setRewardTarget(
    farmerTarget?: string,
    poolTarget?: string
  ): Promise<RpcResponse> {
    return this.request<RpcResponse>("set_reward_targets", {
      farmer_target: farmerTarget,
      pool_target: poolTarget
    });
  }
}

export { Farmer };
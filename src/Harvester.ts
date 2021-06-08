import {
  PlotDirectoriesResponse,
  PlotsResponse
} from "./types/Harvester/RpcResponse";
import { CertPath } from "./types/CertPath";
import { getChiaConfig, getChiaFilePath } from "./ChiaNodeUtils";
import { ChiaOptions, RpcClient } from "./RpcClient";
import { RpcResponse } from "./types/RpcResponse";

const chiaConfig = getChiaConfig();
const defaultProtocol = "https";
const defaultHostname = chiaConfig?.self_hostname || "localhost";
const defaultPort = chiaConfig?.harvester.rpc_port || 8560;
const defaultCaCertPath = chiaConfig?.private_ssl_ca.crt;
const defaultCertPath = chiaConfig?.daemon_ssl.private_crt;
const defaultCertKey = chiaConfig?.daemon_ssl.private_key;

class Harvester extends RpcClient {
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

  public async getPlots(): Promise<PlotsResponse> {
    return this.request<PlotsResponse>("get_plots", {});
  }

  public async refreshPlots(): Promise<RpcResponse> {
    return this.request<RpcResponse>("refresh_plots", {});
  }

  public async deletePlot(
    fileName: string
  ): Promise<RpcResponse> {
    return this.request<RpcResponse>("delete_plot", {
      filename: fileName
    });
  }

  public async addPlotDirectory(
    dirName: string
  ): Promise<RpcResponse> {
    return this.request<RpcResponse>("add_plot_directory", {
      dirname: dirName
    });
  }

  public async getPlotDirectories(): Promise<PlotDirectoriesResponse> {
    return this.request<PlotDirectoriesResponse>("get_plot_directories", {});
  }

  public async removePlotDirectory(
    dirName: string
  ): Promise<RpcResponse> {
    return this.request<RpcResponse>("remove_plot_directory", {
      dirname: dirName
    });
  }
}

export { Harvester };

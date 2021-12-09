import {
  PlotDirectoriesResponse,
  PlotsResponse
} from "./types/Harvester/RpcResponse";
import { CertPath } from "./types/CertPath";
import { ChiaOptions, RpcClient } from "./RpcClient";
import { RpcResponse } from "./types/RpcResponse";

const defaultProtocol = "https";
const defaultHostname = "localhost";
const defaultPort = 8560;

class Harvester extends RpcClient {
  public constructor(options?: Partial<ChiaOptions> & CertPath) {
    super({
      protocol: options?.protocol || defaultProtocol,
      hostname: options?.hostname || defaultHostname,
      port: options?.port || defaultPort,
      certPath: options?.certPath as string,
      keyPath: options?.keyPath as string,
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

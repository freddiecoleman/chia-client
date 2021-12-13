import {
  PlotDirectoriesResponse,
  PlotsResponse
} from "./types/Harvester/RpcResponse";
import { ChiaOptions, RpcClient } from "./RpcClient";
import { RpcResponse } from "./types/RpcResponse";


class Harvester extends RpcClient {
  public constructor(options: ChiaOptions) {
    super({
      hostname: options.hostname,
      port: options.port,
      certPath: options.certPath,
      keyPath: options.keyPath
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

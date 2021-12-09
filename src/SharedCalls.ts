import {ChiaOptions, RpcClient} from "./RpcClient";
import { CertPath } from "./types/CertPath";
import {ConnectionResponse} from "./types/FullNode/RpcResponse";
import {RpcResponse} from "./types/RpcResponse";

const defaultProtocol = "https";
const defaultHostname = "localhost";
const defaultPort = 8555;


class SharedCalls extends RpcClient {
    public constructor(options?: Partial<ChiaOptions> & CertPath) {
        super({
            protocol: options?.protocol || defaultProtocol,
            hostname: options?.hostname || defaultHostname,
            port: options?.port || defaultPort,
            ...(typeof options?.caCertPath !== 'boolean' ? { caCertPath: options?.caCertPath } : {}),
            certPath: options?.certPath as string,
            keyPath: options?.keyPath as string,
        });
    }

    public async getConnections(): Promise<ConnectionResponse> {
        return this.request<ConnectionResponse>("get_connections", {})
    }

    public async openConnection(host: string, port: number): Promise<RpcResponse> {
        return this.request<RpcResponse>(
            "open_connection", {
                host: host,
                port: port
            });
    }

    public async closeConnection(nodeId: string): Promise<RpcResponse> {
        return this.request<RpcResponse>(
          "close_connection", {
                node_id: nodeId,
            });
    }

    public async stopNode(): Promise<RpcResponse>{
        return this.request<RpcResponse>("stop_node", {});

    }
}

export { SharedCalls }

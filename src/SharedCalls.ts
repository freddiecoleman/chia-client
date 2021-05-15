import {ChiaOptions, RpcClient} from "./RpcClient";
import { CertPath } from "./types/CertPath";
import { getChiaConfig, getChiaFilePath } from "./ChiaNodeUtils";
import {ConnectionResponse} from "./types/FullNode/RpcResponse";
import {RpcResponse} from "./types/RpcResponse";

const chiaConfig = getChiaConfig();
const defaultProtocol = "https";
const defaultHostname = chiaConfig?.self_hostname || "localhost";
const defaultPort = chiaConfig?.full_node.rpc_port || 8555;
const defaultCaCertPath = chiaConfig?.private_ssl_ca.crt;
const defaultCertPath = chiaConfig?.daemon_ssl.private_crt;
const defaultCertKey = chiaConfig?.daemon_ssl.private_key;


class SharedCalls extends RpcClient {
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

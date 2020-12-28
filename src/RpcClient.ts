import axios from 'axios';

type Protocol = 'http' | 'https';

interface ChiaOptions {
    protocol: Protocol;
    hostname: string;
    port: number;
}

class RpcClient {
    private readonly protocol: Protocol; 
    private readonly hostname: string;
    private readonly port: number;

    public constructor(options: ChiaOptions) {
        this.protocol = options.protocol;
        this.hostname = options.hostname;
        this.port = options.port;
    }

    private baseUri(): string {
        return `${this.protocol}://${this.hostname}:${this.port}`;
    }

    protected async request<T>(route: string, body: Record<string, string | number | boolean | undefined>): Promise<T> {
        const { data } = await axios.post<T>(`${this.baseUri()}/${route}`, body);

        return data;
    }
}

export {
    ChiaOptions,
    RpcClient
};

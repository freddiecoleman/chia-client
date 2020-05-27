# Chia Client

TypeScript client for communicating with a [Chia](https://www.chia.net/) node using the provided RPC interface. All API calls return promises.

### Example

```
import { ChiaClient } from 'chia-client';

const chiaClient = new ChiaClient({
    protocol: 'http',
    hostname: 'localhost',
    port: 8555
});

const blockchain = await chiaClient.getBlockchainState();
```

### API

- `getBlockchainState(): Promise<BlockchainStateResponse>`
- `getBlock(headerHash: string): Promise<BlockResponse>`
- `getHeaderByHeight(height: number): Promise<HeaderResponse>`
- `getHeader(hash: string): Promise<HeaderResponse>`
- `getUnfinishedBlockHeaders(height: number): Promise<UnfinishedBlockHeadersResponse>`
- `getNetworkSpace(newerBlockHeaderHash: string, olderBlockHeaderHash: string): Promise<NetspaceResponse>`
- `getUnspentCoins(puzzleHash: string, headerHash?: string): Promise<CoinResponse>`
- `getHeaviestBlockSeen(): Promise<TipResponse>`

### Credits

This client is provided by [Chia Blockchain Explorer](https://www.chiaexplorer.com).
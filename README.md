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

- `getBlockchainState(): Promise<BlockchainState>`
- `getBlock(headerHash: string): Promise<Block>`
- `getHeaderByHeight(height: number): Promise<BlockHeader>`
- `getHeader(hash: string): Promise<BlockHeader>`
- `getUnfinishedBlockHeaders(height: number): Promise<Array<BlockHeader>>`
- `getConnections(): Promise<Array<Connection>>`
- `openConnection(host: string, port: number): Promise<void>`
- `closeConnection(nodeId: string): Promise<void>`
- `getUnspentCoins(puzzleHash: string, headerHash?: string): Promise<void>`
- `getHeaviestBlockSeen(): Promise<BlockHeader>`
- `stopNode(): Promise<void>`

### Credits

This client is provided by [Chia Blockchain Explorer](https://www.chiaexplorer.com).
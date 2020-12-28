# Chia Client

TypeScript client for communicating with a [Chia](https://www.chia.net/) node using the provided RPC interface. All API calls return promises.

### Example

```
import { FullNode } from 'chia-client';

const fullNode = new FullNode({
    protocol: 'http',
    hostname: 'localhost',
    port: 8555
});

const blockchain = await fullNode.getBlockchainState();
```

### Credits

This client is provided by [Chia Blockchain Explorer](https://www.chiaexplorer.com).
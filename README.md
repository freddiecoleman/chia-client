# Chia Client

TypeScript client for communicating with [Chia](https://www.chia.net/) RPC interfaces. All API calls return promises.

### Full Node

```
import { FullNode } from 'chia-client';

const fullNode = new FullNode({
    protocol: 'http',
    hostname: 'localhost',
    port: 8555
});

const blockchain = await fullNode.getBlockchainState();
```

### Wallet

```
import { Wallet } from 'chia-client';

const wallet = new Wallet({
    protocol: 'http',
    hostname: 'localhost',
    port: 8555
});

const mnemonic = await wallet.generateMnemonic();
```

### Credits

This client is provided by [Chia Blockchain Explorer](https://www.chiaexplorer.com).

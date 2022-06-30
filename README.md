# Chia Client

TypeScript client for communicating with [Chia](https://www.chia.net/) RPC interfaces. All API calls return promises.

### Install and Setup
```
npm install chia-client
```

### Full Node

```
import { FullNode } from 'chia-client';

const fullNode = new FullNode({
    protocol: 'https',
    hostname: 'localhost',
    port: 8555
});

const blockchain = fullNode.getBlockchainState();

console.log(await blockChainState.blockchain_state.space);
```

### Wallet

```
import { Wallet } from 'chia-client';

const wallet = new Wallet({
    protocol: 'https',
    hostname: 'localhost',
    port: 9256
});

const mnemonic = await wallet.generateMnemonic();
```

### Credits

This client is provided by [Chia Blockchain Explorer](https://www.chiaexplorer.com).

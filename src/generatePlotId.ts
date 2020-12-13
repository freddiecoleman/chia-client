import { createHash } from 'crypto';

const generatePlotId = (poolPubKey: string, plotPubKey: string) => {
    const combinedPubKeys = Buffer.concat([
        Buffer.from(poolPubKey.slice(2), 'hex'),
        Buffer.from(plotPubKey.slice(2), 'hex')
    ]);
    const hash = createHash('sha256');

    hash.update(combinedPubKeys);

    const plotId = hash.digest();

    return plotId.toString('hex');
};

export { generatePlotId };

import { createHash } from 'crypto';
import { BlockHeader } from './types/FullNode/BlockHeader';

function big_int_to_array(x: bigint, num_bytes: number) {
    let truncated = BigInt.asUintN(num_bytes * 8, x);
    const arr: number[] = [];

    for (let i = 0; i < num_bytes; i++) {
        arr.splice(0, 0, Number(truncated & BigInt(255)));
        truncated >>= BigInt(8);
    }
    return arr;
}

function hex_to_array(hexString: string) {
    hexString = hexString.slice(2);
    const arr = []
    for (var i = 0; i < hexString.length; i += 2) {
        arr.push(parseInt(hexString.substr(i, 2), 16));
    }
    return arr;
}

function arr_to_hex(buffer: Buffer) { // buffer is an ArrayBuffer
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

/**
 * Copied from chia-blockchain repo. Check there for changes.
 */
const hashHeader = (header: BlockHeader) => {
    var buf = big_int_to_array(BigInt(header.data.height), 4);
    buf = buf.concat(hex_to_array(header.data.prev_header_hash));
    buf = buf.concat(big_int_to_array(BigInt(header.data.timestamp), 8));
    buf = buf.concat(hex_to_array(header.data.filter_hash));
    buf = buf.concat(hex_to_array(header.data.proof_of_space_hash));
    buf = buf.concat(big_int_to_array(BigInt(header.data.weight), 16));
    buf = buf.concat(big_int_to_array(BigInt(header.data.total_iters), 8));
    buf = buf.concat(hex_to_array(header.data.additions_root));
    buf = buf.concat(hex_to_array(header.data.removals_root));
    buf = buf.concat(hex_to_array(header.data.farmer_rewards_puzzle_hash));
    buf = buf.concat(
        big_int_to_array(BigInt(header.data.total_transaction_fees), 8)
    );
    buf = buf.concat(hex_to_array(header.data.pool_target.puzzle_hash));
    buf = buf.concat(
        big_int_to_array(BigInt(header.data.pool_target.max_height), 4)
    );
    buf = buf.concat(hex_to_array(header.data.aggregated_signature));
    buf = buf.concat(big_int_to_array(BigInt(header.data.cost), 8));
    buf = buf.concat(hex_to_array(header.data.extension_data));
    buf = buf.concat(hex_to_array(header.data.generator_hash));
    buf = buf.concat(hex_to_array(header.plot_signature));

    const hash = createHash('sha256');

    hash.update(new Uint8Array(buf));

    const headerHash = hash.digest();

    return arr_to_hex(headerHash);
};

export { hashHeader };

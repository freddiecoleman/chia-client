function unix_to_short_date(unix_timestamp: number) {
    let d = new Date(unix_timestamp * 1000)
    return d.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        }) + " " + d.toLocaleTimeString();
}

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


export {
    unix_to_short_date,
    big_int_to_array,
    hex_to_array,
    arr_to_hex
}

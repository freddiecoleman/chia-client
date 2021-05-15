export interface Connection{
    bytes_read: bigint
    bytes_written: bigint
    creation_time: number
    last_message_time: number
    local_port: number
    node_id: string
    peak_hash: string
    peak_height: number
    peak_weight: number
    peer_host: string
    peer_port: number
    peer_server_port: string
    type: number
}

import nock from 'nock';
import { FullNode } from '../index';

describe('chia client', () => {
    describe('RPC calls', () => {
        const chiaClient = new FullNode();

        it('calls get_blockchain_state', async() => {
            nock('http://localhost:8555')
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .post('/get_blockchain_state')
                .reply(200, 'success');
            
            expect(await chiaClient.getBlockchainState()).toEqual('success');
        });

        it('calls get_block with header_hash in body', async() => {
            nock('http://localhost:8555')
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .post('/get_block', { header_hash: 'fakeHeaderHash' })
                .reply(200, 'success');
            
            expect(await chiaClient.getBlock('fakeHeaderHash')).toEqual('success');
        });

        it('calls get_header_by_height with height in body', async() => {
            nock('http://localhost:8555')
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .post('/get_header_by_height', { height: 42 })
                .reply(200, 'success');
            
            expect(await chiaClient.getHeaderByHeight(42)).toEqual('success');
        });

        it('calls get_header with header_hash in body', async() => {
            nock('http://localhost:8555')
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .post('/get_header', { header_hash: 'fakeHeaderHash' })
                .reply(200, 'success');
            
            expect(await chiaClient.getHeader('fakeHeaderHash')).toEqual('success');
        });

        it('calls get_unfinished_block_headers with header_hash in body', async() => {
            nock('http://localhost:8555')
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .post('/get_unfinished_block_headers', { height: 42 })
                .reply(200, 'success');
            
            expect(await chiaClient.getUnfinishedBlockHeaders(42)).toEqual('success');
        });

        it('calls get_unspent_coins with puzzle_hash and header_hash in body', async() => {
            nock('http://localhost:8555')
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .post('/get_unspent_coins', {
                    puzzle_hash: 'fakePuzzleHash',
                    header_hash: 'fakeHeaderHash'
                })
                .reply(200, 'success');
            
            expect(await chiaClient.getUnspentCoins('fakePuzzleHash', 'fakeHeaderHash')).toEqual('success');
        });

        it('calls get_heaviest_block_seen', async() => {
            nock('http://localhost:8555')
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .post('/get_heaviest_block_seen')
                .reply(200, 'success');
            
            expect(await chiaClient.getHeaviestBlockSeen()).toEqual('success');
        });
    });
});

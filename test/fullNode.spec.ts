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

        it('calls get_sub_block with header_hash in body', async() => {
            nock('http://localhost:8555')
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .post('/get_sub_block', { header_hash: 'fakeHeaderHash' })
                .reply(200, 'success');
            
            expect(await chiaClient.getSubBlock('fakeHeaderHash')).toEqual('success');
        });

        it('calls get_sub_block_record_by_sub_height with height in body', async() => {
            nock('http://localhost:8555')
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .post('/get_sub_block_record_by_sub_height', { sub_height: 42 })
                .reply(200, 'success');
            
            expect(await chiaClient.getSubBlockRecordBySubHeight(42)).toEqual('success');
        });

        it('calls get_sub_block_record with header_hash in body', async() => {
            nock('http://localhost:8555')
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .post('/get_sub_block_record', { header_hash: 'fakeHeaderHash' })
                .reply(200, 'success');
            
            expect(await chiaClient.getSubBlockRecord('fakeHeaderHash')).toEqual('success');
        });

        it('calls get_unfinished_sub_block_headers with header_hash in body', async() => {
            nock('http://localhost:8555')
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .post('/get_unfinished_sub_block_headers', { sub_height: 42 })
                .reply(200, 'success');
            
            expect(await chiaClient.getUnfinishedSubBlockHeaders(42)).toEqual('success');
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

        it('calls get_additions_and_removals', async() => {
            nock('http://localhost:8555')
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .post('/get_additions_and_removals', { header_hash: 'fakeHeaderHash' })
                .reply(200, 'success');
            
            expect(await chiaClient.getAdditionsAndRemovals('fakeHeaderHash')).toEqual('success');
        });
    });
});

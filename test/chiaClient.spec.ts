import { ChiaClient } from '../index';

describe('chia client', () => {
    it('sets a default uri', () => {
        const chiaClient = new ChiaClient();

        expect(chiaClient.baseUri()).toBe('http://localhost:8555');
    });

    it('uses options to connect to a different uri', () => {
        const chiaClient = new ChiaClient({
            protocol: 'https',
            hostname: 'chia.net',
            port: 80
        });

        expect(chiaClient.baseUri()).toBe('https://chia.net:80');
    });
});

import * as fs from 'fs';

export type Config = {
    database: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
    server: {
        port: number;
    };
}

export const config: Config = JSON.parse(fs.readFileSync('./config.json').toString('utf8'));

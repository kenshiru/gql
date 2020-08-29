import { createConnection } from 'typeorm';
import { Connection } from 'typeorm/index';
import * as entities from './entities';

export async function initConnection(): Promise<Connection> {
    return createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'apm',
        password: '123',
        database: 'gql',
        entities: Object.values(entities),
        logging: true
    });
}



import { server } from './server';
import { Container } from 'typedi';
import { AuthorRepository, BookRepository } from './orm';
import * as typeorm from 'typeorm';
import * as entities from './orm/entities';

(async () => {
    await typeorm.createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'apm',
        password: '123',
        database: 'gql',
        entities: Object.values(entities),
        logging: true
    });

    // Bind repositories
    Container.set(AuthorRepository, typeorm.getCustomRepository(AuthorRepository));
    Container.set(BookRepository, typeorm.getCustomRepository(BookRepository));

    await server.listen(4040);
})();

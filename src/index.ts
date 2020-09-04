import { server } from './server';
import { Container } from 'typedi';
import { AuthorRepository, BookRepository } from './orm';
import * as typeorm from 'typeorm';
import * as entities from './orm/entities';
import * as fs from 'fs';

(async () => {
    const config = JSON.parse(fs.readFileSync('./config.json').toString('utf8'));

    await typeorm.createConnection({
        ...config.database,
        entities: Object.values(entities),
    });

    // Bind repositories
    Container.set(AuthorRepository, typeorm.getCustomRepository(AuthorRepository));
    Container.set(BookRepository, typeorm.getCustomRepository(BookRepository));

    await server.listen(config.server.port);
})();

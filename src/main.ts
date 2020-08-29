import 'reflect-metadata';
import { AuthorResolver, BookResolver } from './resolvers';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { initConnection } from './db';

(async () => {
    const schema = await buildSchema({
        resolvers: [
            BookResolver,
            AuthorResolver
        ],
    });

    await initConnection();


    const server = new ApolloServer({ schema });
    const listenUrl = await server.listen(4040);

    console.log('Server started.', listenUrl);
})();

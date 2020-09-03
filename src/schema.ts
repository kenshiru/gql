import { buildSchemaSync } from 'type-graphql';
import { AuthorResolver, BookResolver } from './resolvers';
import { Container } from 'typedi';

export const schema = buildSchemaSync({
    resolvers: [
        BookResolver,
        AuthorResolver
    ],
    container: Container
});

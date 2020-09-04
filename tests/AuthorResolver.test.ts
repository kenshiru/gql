import { server } from '../src/server';
import * as assert from "assert";
import { AuthorRepositoryMock } from './mocks/AuthorRepositoryMock';
import { Container } from 'typedi';
import { AuthorRepository, BookRepository } from '../src/orm';
import { BookRepositoryMock } from './mocks/BookRepositoryMock';

// Bind repositories
Container.set(AuthorRepository, new AuthorRepositoryMock());
Container.set(BookRepository, new BookRepositoryMock());

describe('AuthorResolver', () => {
    it('mutation createAuthor(...) returns author.name and author.id', async () => {
        const result = await server.executeOperation({
            query: 'mutation {\n' +
                '  createAuthor(author: {\n' +
                '    name: "NEW AUTHOR"\n' +
                '  }) {\n' +
                '      name\n' +
                '      authorId\n' +
                '  }\n' +
                '}'
        });

        assert.deepStrictEqual(
            JSON.parse(JSON.stringify(result.data)), // Костыль. Внутри что-то странное
            {
                createAuthor: (() => {
                    const author =  AuthorRepositoryMock.dataset
                        .find(author => author.authorId === AuthorRepositoryMock.lastAuthorId - 1);
                    return {
                        name: author.name,
                        authorId: author.authorId,
                    }
                })()
            }
        );
    });
});

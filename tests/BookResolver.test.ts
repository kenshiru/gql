import { server } from '../src/server';
import { Container } from 'typedi';
import { AuthorRepository, BookRepository } from '../src/orm';
import * as assert from 'assert';
import { AuthorRepositoryMock } from './mocks/AuthorRepositoryMock';
import { BookRepositoryMock } from './mocks/BookRepositoryMock';


// Bind repositories
Container.set(AuthorRepository, new AuthorRepositoryMock());
Container.set(BookRepository, new BookRepositoryMock());

describe('BookResolver', () => {
    it('books { bookId name }', async () => {
        const result = await server.executeOperation({
            query: 'query {\n' +
                '    books {\n' +
                '        bookId\n' +
                '        name\n' +
                '        pageCount\n' +
                '    }\n' +
                '}\n'
        });


        assert.deepStrictEqual(
            JSON.parse(JSON.stringify(result.data)),
            {
                books: (await Container.get(BookRepository).find())
                    .map(book => {
                        return { bookId: book.bookId, name: book.name, pageCount: book.pageCount }
                    })
            }
        );
    });

    it('query { books { name author { name }} }', async () => {
        const result = await server.executeOperation({
            query: 'query {\n' +
                '    books {\n' +
                '        name\n' +
                '        author {\n' +
                '            name\n' +
                '        }\n' +
                '    }\n' +
                '}\n'
        });

        assert.deepStrictEqual(
            JSON.parse(JSON.stringify(result.data)), // Костыль. Внутри что-то странное
            {
                books: BookRepositoryMock.dataset.map(book => {
                    return {
                        name: book.name,
                        author: (() => {
                            const author = AuthorRepositoryMock.dataset
                                .find(author => author.authorId === book.authorId);

                            return {
                                name: author.name,
                            };
                        })(),
                    }
                })
            }
        );
    });

    it('mutation createBook(...) returns book.name, book.bookId and book.pageCount', async () => {
        const result = await server.executeOperation({
            query: 'mutation {\n' +
                '  createBook(book: {\n' +
                '    name: "New Book"\n' +
                '    pageCount: 189\n' +
                '    authorId: 2\n' +
                '  }) {\n' +
                '      name\n' +
                '      bookId\n' +
                '      pageCount\n' +
                '  }\n' +
                '}'
        });

        assert.deepStrictEqual(
            JSON.parse(JSON.stringify(result.data)), // Костыль. Внутри что-то странное
            {
                createBook: (() => {
                    const book = BookRepositoryMock.dataset
                        .find(book => book.bookId === BookRepositoryMock.lastBookIdentifier - 1);
                    return {
                        name: book.name,
                        bookId: book.bookId,
                        pageCount: book.pageCount,
                    }
                })()
            }
        );
    });
});

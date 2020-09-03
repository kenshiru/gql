import { GraphQLRequest } from 'apollo-server-core/src/requestPipeline';
import { server } from './server';
import { Container } from 'typedi';
import { AuthorRepository, BookRepository } from './orm';
import { Book } from './orm/entities';
import * as assert from 'assert';

class AuthorRepositoryMock extends AuthorRepository {

}

class BookRepositoryMock extends BookRepository {
    public async find(...args): Promise<Book[]> {
        return [
            new Book({ bookId: 1, name: 'First book' }),
        ];
    }

    public async findOne(...args): Promise<Book> {
        return new Book({ bookId: 1, name: 'First book', pageCount: 163, authorId: 1 });
    }

    // @ts-ignore
    public async save(...args): Promise<Book> {
        return new Book({ bookId: 2, name: 'Other book', pageCount: 120, authorId: 1 });
    }
}

// Bind repositories
//Container.set(AuthorRepository, typeorm.getCustomRepository(AuthorRepository));
Container.set(BookRepository, new BookRepositoryMock());

describe('BookResolver', () => {
    it('books { bookId name }', async () => {
        const request: GraphQLRequest = {
            query: 'query {\n' +

                '    books {\n' +
                '        bookId\n' +
                '        name\n' +
                '    }\n' +
                '}\n'
        }

        const result = await server.executeOperation(request);

        console.log(result);

        assert.deepStrictEqual(
            result.data,
            {
                books: [
                    {
                        bookId: 1,
                        name: 'First book'
                    }
                ]
            });
    });
});

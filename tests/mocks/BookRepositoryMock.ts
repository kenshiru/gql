import { BookRepository } from '../../src/orm';
import { Book } from '../../src/orm/entities';

export class BookRepositoryMock extends BookRepository {
    public static dataset = [
        new Book({
            bookId: 1,
            name: 'First book',
            pageCount: 163,
            authorId: 1,
        }),
        new Book({
            bookId: 2,
            name: 'Second book',
            pageCount: 348,
            authorId: 1,
        }),
        new Book({
            bookId: 3,
            name: 'Third book',
            pageCount: 98,
            authorId: 2,
        }),
    ]

    public static lastBookIdentifier = 4;

    public async find(...args): Promise<Book[]> {
        return BookRepositoryMock.dataset;
    }

    public async findOne(...args): Promise<Book> {
        return BookRepositoryMock.dataset.find(book => book.bookId === args[0]);
    }

    // @ts-ignore
    public async save(...args): Promise<Book> {
        const book = new Book({
            bookId: BookRepositoryMock.lastBookIdentifier++,
            name: 'Other mock dataset book',
            pageCount: 120,
            authorId: 1,
        });

        BookRepositoryMock.dataset.push(book);

        return book;
    }
}

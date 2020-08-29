import { Author, Book } from './entities';

export const data = {
    bookId: 4,
    authorId: 3,
    authors: [
        new Author({ authorId: 1, name: 'Any Author' }),
        new Author({ authorId: 2, name: 'Other Author' }),
    ],
    books: [
        new Book({ bookId: 1, name: 'First book', pageCount: 163, authorId: 1 }),
        new Book({ bookId: 2, name: 'Second book', pageCount: 348, authorId: 1 }),
        new Book({ bookId: 3, name: 'Third book', pageCount: 98, authorId: 2 }),
    ],
};

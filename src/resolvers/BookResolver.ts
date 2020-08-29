import { Arg, FieldResolver, Int, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Author, Book } from '../entities';
import { data } from '../data';
import { BookCreateInput } from './types/BookCreateInput';

@Resolver(of => Book)
export class BookResolver {
    @Query(returns => [Book])
    public async books(): Promise<Book[]> {
        return data.books;
    }

    @Query(returns => Book, { nullable: true })
    public async book(@Arg('bookId', type => Int) bookId: number): Promise<Book> {
        return data.books.find(book => bookId === book.bookId);
    }

    @FieldResolver()
    public async author(@Root() book: Book): Promise<Author> {
        return data.authors.find(author => author.authorId === book.authorId);
    }

    @Mutation(returns => Book)
    async createBook(@Arg('book') bookCreateInput: BookCreateInput): Promise<Book> {
        const book = new Book(Object.assign({ bookId: data.bookId }, bookCreateInput));
        data.books.push(book);
        data.bookId += 1;
        return book;
    }
}

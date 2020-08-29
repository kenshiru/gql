import { Arg, FieldResolver, Int, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Author, Book } from '../entities';
import { BookCreateInput } from './types';
import { getConnection } from 'typeorm/index';

@Resolver(of => Book)
export class BookResolver {
    @Query(returns => [Book])
    public async books(): Promise<Book[]> {
        return getConnection().getRepository(Book).find();
    }

    @Query(returns => Book, { nullable: true })
    public async book(@Arg('bookId', type => Int) bookId: number): Promise<Book> {
        return getConnection().getRepository(Book).findOne(bookId);
    }

    @FieldResolver(returns => Author)
    public async author(@Root() book: Book): Promise<Author> {
        return book.author;
    }

    @Mutation(returns => Book)
    async createBook(@Arg('book') bookCreateInput: BookCreateInput): Promise<Book> {
        return getConnection().getRepository(Book).save(bookCreateInput);
    }
}

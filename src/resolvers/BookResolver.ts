import { Arg, FieldResolver, Int, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Author, Book } from '../orm/entities';
import { BookCreateInput } from './types';
import { Inject, Service } from 'typedi';
import { AuthorRepository, BookRepository } from '../orm';


@Service()
@Resolver(of => Book)
export class BookResolver {
    @Inject(type => BookRepository)
    protected bookRepository: BookRepository;

    @Inject(type => AuthorRepository)
    protected authorRepository: AuthorRepository;

    @Query(returns => [Book])
    public async books(): Promise<Book[]> {
        return this.bookRepository.find();
    }

    @Query(returns => Book, { nullable: true })
    public async book(@Arg('bookId', type => Int) bookId: number): Promise<Book> {
        return this.bookRepository.findOne(bookId);
    }

    @Mutation(returns => Book)
    async createBook(@Arg('book') bookCreateInput: BookCreateInput): Promise<Book> {
        return this.bookRepository.save(bookCreateInput);
    }

    @FieldResolver(returns => Author)
    public async author(@Root() book: Book): Promise<Author> {
        return this.authorRepository.findOne(book.authorId);
    }
}

import { Arg, Mutation, Resolver } from 'type-graphql';
import { Author, Book } from '../entities';
import { data } from '../data';
import { AuthorCreateInput } from './types/AuthorCreateInput';

@Resolver(of => Author)
export class AuthorResolver {
    @Mutation(returns => Author)
    async createAuthor(@Arg('author') authorCreateInput: AuthorCreateInput): Promise<Author> {
        const author = new Author(authorCreateInput);
        data.authors.push(author);

        return author;
    }
}

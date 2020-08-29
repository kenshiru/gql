import { Arg, Mutation, Resolver } from 'type-graphql';
import { Author } from '../entities';
import { AuthorCreateInput } from './types';
import { getConnection } from 'typeorm/index';

@Resolver(of => Author)
export class AuthorResolver {
    @Mutation(returns => Author)
    async createAuthor(@Arg('author') authorCreateInput: AuthorCreateInput): Promise<Author> {
        return getConnection().getRepository(Author).save(authorCreateInput);
    }
}

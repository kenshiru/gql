import { Arg, Mutation, Resolver } from 'type-graphql';
import { Author } from '../orm/entities';
import { AuthorCreateInput } from './types';
import { Inject } from 'typedi';
import { AuthorRepository } from '../orm';

@Resolver(of => Author)
export class AuthorResolver {
    @Inject(type => AuthorRepository)
    protected authorRepository: AuthorRepository;

    @Mutation(returns => Author)
    async createAuthor(@Arg('author') authorCreateInput: AuthorCreateInput): Promise<Author> {
        return this.authorRepository.save(authorCreateInput);
    }
}

import { AuthorRepository } from '../../src/orm';
import { Author } from '../../src/orm/entities';

export class AuthorRepositoryMock extends AuthorRepository {
    public static dataset = [
        new Author({ authorId: 1, name: 'Any Author' }),
        new Author({ authorId: 2, name: 'Other Author' }),
    ]

    public static lastAuthorId = 3;

    public async findOne(...args): Promise<Author> {
        return AuthorRepositoryMock.dataset.find(author => author.authorId === args[0]);
    }

    // @ts-ignore
    public async save(...args): Promise<Author> {
        const author = new Author({ ...args[0], authorId: AuthorRepositoryMock.lastAuthorId++ });

        AuthorRepositoryMock.dataset.push(author);

        return author;
    }
}

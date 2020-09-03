import { EntityRepository, Repository } from 'typeorm/index';
import { Author } from './entities';

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {
}


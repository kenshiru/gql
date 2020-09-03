import { EntityRepository, Repository } from 'typeorm/index';
import { Book } from './entities';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
}

import { data } from './data';
import { initConnection } from './db';
import { Author, Book } from './entities';


(async () => {
    const connection = await initConnection();

    const createdAuthors = await connection.getRepository(Author).save(data.authors);
    console.log(createdAuthors);

    const createdBooks = await connection.getRepository(Book).save(data.books);
    console.log(createdBooks);

})();

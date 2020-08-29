import { Author } from './Author';
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Book {
    @Field(type => Int)
    public bookId: number;

    @Field(type => String)
    public name: string;

    @Field(type => Int)
    public pageCount: number;

    @Field(type => Int)
    public authorId: number;

    @Field(type => Author)
    public author: Author;

    constructor(data: Partial<Book>) {
        Object.assign(this, data);
    }
}

import { Field, InputType, Int } from 'type-graphql';
import { Book } from '../../orm/entities';

@InputType()
export class BookCreateInput implements Partial<Book> {
    @Field(type => String)
    public name: string;

    @Field(type => Int)
    public pageCount: number;

    @Field(type => Int)
    public authorId: number;
}

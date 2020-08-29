import { Field, InputType, Int } from 'type-graphql';
import { Author } from '../../entities';

@InputType()
export class AuthorCreateInput implements Partial<Author> {
    @Field(type => String)
    public name: string;

    @Field(type => Int)
    public authorId: number;
}

import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Author {
    constructor(data: Partial<Author>) {
        Object.assign(this, data);
    }

    @Field(type => Int)
    public authorId: number;

    @Field(type => String)
    public name: string;
}

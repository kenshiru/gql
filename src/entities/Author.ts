import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm/index';
import { Book } from './Book';

@ObjectType()
@Index('author_pkey', ['authorId'], { unique: true })
@Entity('author', { schema: 'public' })
export class Author {
    @Field(type => Int)
    @PrimaryGeneratedColumn({ type: 'integer', name: 'author_id' })
    public authorId: number;

    @Field(type => String)
    @Column('character varying', { name: 'name', length: 255 })
    public name: string;

    @OneToMany(() => Book, (book) => book.author)
    books: Book[];
}

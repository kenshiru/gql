import { Author } from './Author';
import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm/index';

@ObjectType()
@Index('book_pkey', ['bookId'], { unique: true })
@Entity('book', { schema: 'public' })
export class Book {
    @Field(type => Int)
    @PrimaryGeneratedColumn({ type: 'integer', name: 'book_id' })
    public bookId: number;

    @Field(type => String)
    @Column('character varying', { name: 'name', length: 255 })
    public name: string;

    @Field(type => Int)
    @Column('smallint', { name: 'page_count' })
    public pageCount: number;

    @Field(type => Author)
    @ManyToOne(() => Author, (author) => author.books, { eager: true })
    @JoinColumn([{ name: 'author_id', referencedColumnName: 'authorId' }])
    public author: Author;

    @Column('int', { name: 'author_id' })
    public authorId: number;
}

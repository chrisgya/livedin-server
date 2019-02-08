import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { Review } from "./Review";
import { CommentLike } from "./CommentLike";
import { Field, ID, ObjectType, Int } from "type-graphql";
  
@ObjectType()
  @Entity("comments")
  export class Comment extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid") 
    id: string;
  
    @Field()
    @Column("uuid")
    review_id: string;

    @Field()
    @Column("uuid")
    user_id: string;

    @Field()
    @Column("text")
    note: string;
    
    @Field()
    @CreateDateColumn()
    created: Date;
  
    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: "user_id" })
    user: Promise<User>;

    @ManyToOne(() => Review, rv => rv.id)
    @JoinColumn({name: "review_id"})
    review: Promise<Review>;
  
    @OneToMany(() => CommentLike, cmlike => cmlike.comment)
    commentLike: CommentLike[];

    @Field(() => Int, {nullable: true})
    numCommentLikes: number | null;

  }
  
  //NB: 1 to 1 => Review
  //many to 1 => User
import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn
  } from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";
import { Field, ID, ObjectType } from "type-graphql";
  //import { Listing } from "./Listing";
  
  @ObjectType()
  @Entity("commentlikes")
  export class CommentLike extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid") 
    id: string;
  
    @Field()
    @Column("uuid")
    comment_id: string;

    @Field()
    @Column("uuid")
    user_id: string;
  
    @Field()
    @CreateDateColumn()
    created: Date;


    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: "user_id" })
    user: Promise<User>;

    @ManyToOne(() => Comment, cm => cm.id)
    @JoinColumn({ name: "comment_id" })
    comment: Promise<Comment>;
  }
  
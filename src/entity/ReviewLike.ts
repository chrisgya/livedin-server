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
import { Review } from "./Review";
import { Field, ID, ObjectType } from "type-graphql";
  
@ObjectType()
  @Entity("reviewlikes")
  export class ReviewLike extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid") 
    id: string;
  
    @Column("uuid")
    review_id: string;

    @Column("uuid")
    user_id: string;  
  
    @Field()
    @CreateDateColumn()
    created: Date;

    @ManyToOne(() => User, user => user.reviews)
    @JoinColumn({ name: "user_id" })
    user: Promise<User>;

    
    @ManyToOne(() => Review, rv => rv.reviewLike)
    @JoinColumn({ name: "review_id" })
    review: Promise<Review>;
  }
  
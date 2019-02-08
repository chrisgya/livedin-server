import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Review } from "./Review";
import { Comment } from "./Comment";
import { CommentLike } from "./CommentLike";
import { ReviewLike } from "./ReviewLike";
import { ID, Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid") id: string;

  @Field()
  @Column("varchar", { length: 50, unique: true })
  username: string;

  @Field()
  @Column("varchar", { length: 100, unique: true })
  email: string;

  @Field()
  @Column("varchar", { length: 50 })
  firstname: string;

  @Field(()=>String, {nullable: true})
  @Column("varchar", { length: 50, nullable: true })
  middlename: string | null;

  @Field()
  @Column("varchar", { length: 50 })
  lastname: string;

  @Field(()=>String, {nullable: true})
  @Column("varchar", { length: 500, nullable: true })
  pictureurl: string | null;

  @Column("text", { nullable: true }) 
  password: string | null;

  @Field()
  @Column("varchar", { length: 20 }) 
  logintype: string;

  @Column("text", { nullable: true }) 
  twitterid: string | null;

  @Column("text", { nullable: true }) 
  facebookid: string | null;

  @Column("text", { nullable: true }) 
  googleid: string | null;

  @Column("boolean", { default: false })
  confirmed: boolean;

  @Field()
  @Column("boolean", { default: false })
  isadmin: boolean;

  @Column("boolean", { default: false })
  islocked: boolean;

  @Field()
  @CreateDateColumn()
  created: Date;

  @Column("timestamp", {nullable: true})
  lastlogin: Date | null;

  @UpdateDateColumn({ nullable: true })
  lastupdated: Date | null;

  @Column("text", { array: true, nullable: true })
  favourite_properties: string[] | null;



  @OneToMany(() => Review, review => review.user_id)
  reviews: Promise<Review[]>;

  @OneToMany(() => ReviewLike, reviewLike => reviewLike.user_id)
  reviewLikes: Promise<ReviewLike[]>;

  @OneToMany(() => Comment, comment => comment.user_id)
  comments: Promise<Comment[]>;

  @OneToMany(() => CommentLike, commentLike => commentLike.user_id)
  commentLikes: Promise<CommentLike[]>;

}

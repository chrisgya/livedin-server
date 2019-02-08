import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    UpdateDateColumn,
    CreateDateColumn
  } from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";
import { ReviewLike } from "./ReviewLike";
import { ID, Field, ObjectType, Int } from "type-graphql";
  
@ObjectType()
  @Entity("reviews")
  //  @Index(["search_field"], {unique: true})
  export class Review extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid") 
    id: string;
  
  // property review
  @Field()
    @Column("varchar", { length: 50 })
    property_type: string;
  
    @Field()
    @Column("varchar", { length: 50 })
    property_name: string;
  
    @Field()
    @Column("varchar", { length: 225 })
    property_desc: string;
  
    @Field(()=>[String], {nullable: true})
    @Column("text", { array: true, nullable: true })
    amenities: string[] | null;
  
    @Field()
    @Column("int") 
    bedrooms: number;

    @Field()
    @Column("int") 
    bathrooms: number;

    @Field(()=>Number, {nullable: true})
    @Column("int", { nullable: true}) 
    guestrooms: number | null;
  
    @Field()
    @Column("boolean", { default: false })
    furnished: boolean;
  
    @Field(()=>String, {nullable: true})
    @Column("varchar", { length: 20, nullable: true })
    unitfloor: string | null;
  
    @Field()
    @Column("varchar", { length: 100 })
    for_rent_by: string;
  
    @Field()
    @Column("decimal") 
    rent_amount: number;
  
    @Field()
    @Column("varchar", { length: 20 })
    rent_pay_period: string; //(per week/month/year)
  
    @Field()
    @Column("varchar", { length: 20 })
    currency: string;
  
    @Field()
    @Column("varchar", { length: 500 })
    address: string;
  
    @Field()
    @Column("varchar", { length: 50 })
    city: string;
  
    @Field()
    @Column("varchar", { length: 50 })
    state: string;
  
    @Field(()=>String, {nullable: true})
    @Column("varchar", { length:20, nullable: true })
    zip: string | null;
  
    @Field()
    @Column("varchar", { length: 100 })
    country: string;
  
    @Field(()=>Number,{nullable: true})
    @Column("double precision", {nullable: true}) 
    lat: number | null;
  
    @Field(()=>Number,{nullable: true})
    @Column("double precision", {nullable: true}) 
    lng: number | null;
  
    @Field(()=>[String], {nullable: true})
    @Column("text", { array: true, nullable: true  })
    photos: string[] | null;
  
    @Field(()=>String, {nullable: true})
    @Column("text", { nullable: true })
    video: string | null;


    // review section

    @Field()
    @Column("varchar", { length: 200 })
    title: string;

    @Field()
    @Column("text")
    details: string;

    @Field()
    @Column("float") 
    rate: number;
    
    @Field()
    @Column("boolean", { default: false })
    anonymous: boolean;

    @Field()
    @Column("boolean", { default: false })
    inappropriate: boolean;
    
    @Field()
    @CreateDateColumn()
    created: Date;
    
    @Field()
    @UpdateDateColumn()
    modified: Date;  

    @Column("tsvector", {nullable: true})
    search_field: string | null;

    @Field()
    @Column("uuid")
    user_id: string;

    @ManyToOne(() => User, user => user.reviews)
    @JoinColumn({ name: "user_id" })
    user: Promise<User>;

    @OneToMany(() => Comment, cm => cm.review)
    comments: Promise<Comment[]>;

    @OneToMany(() => ReviewLike, cm => cm.review)
    reviewLike: Promise<ReviewLike[]>;   


    @Field(() => Int, {nullable: true})
    numLikes: number | null;

    @Field(() => [Comment!], {nullable: true})
    reviewComments: Comment[] | null;

  }
  
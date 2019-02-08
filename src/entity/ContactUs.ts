import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
  } from "typeorm";
import { ID, Field, ObjectType } from "type-graphql";
  
  @ObjectType()
  @Entity("contactus")
  export class ContactUs extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid") id: string;
  
    @Field()
    @Column("varchar", { length: 50 })
    name: string;

    @Field()
    @Column("varchar", { length: 100 })
    email: string; 
    
    @Field()
    @Column("varchar", { length: 200 })
    title: string;

    @Field()
    @Column("text")
    message: string;
    
    @Field()
    @CreateDateColumn()
    created: Date;  
  
  }
  
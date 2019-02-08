import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn
  } from "typeorm";
import { ID, Field, ObjectType } from "type-graphql";
  
  @ObjectType()
  @Entity("emailsubscriptions")
  export class EmailSubscription extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid") 
    id: string;
  
    @Field()
    @Column("varchar", { length: 50 })
    name: string;

    @Field()
    @Column("varchar", { length: 100 })
    email: string; 

    @Field()
    @Column("boolean", { default: false })
    confirmed: boolean;
   
    @Field()
    @CreateDateColumn()
    created: Date; 
  
  
  
  }
  
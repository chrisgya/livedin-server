import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ResponseWithValidationsClass {

  @Field()
  success: boolean;
  @Field(()=>String, {nullable: true})
  path: string | null; 
  @Field()
  message: string; 
}

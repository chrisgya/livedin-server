import { InputType, Field } from "type-graphql";
import { Filters } from "./filters";

@InputType()
export class ReviewsInput{

  @Field(()=> Boolean, {nullable: true})
  self: boolean | null;

  @Field(()=> String, {nullable: true})
  id: string | null;

  @Field(()=> String, {nullable: true})
  searchtext: string | null;

  @Field(()=> Number, {nullable: true})
  offset: number | null;

  @Field(()=> Number, {nullable: true})
  limit: number | null;

  @Field(()=> Filters, {nullable: true})
  filters: Filters | null;
  
}

import { InputType, Field } from "type-graphql";

@InputType()
export class Filters{

  @Field(()=> String, {nullable: true})
  property_type: string | null;

  @Field(()=> Number, {nullable: true})
  bedrooms: number | null;

  @Field(()=> Number, {nullable: true})
  bathrooms: number | null;

  @Field(()=> Boolean, {nullable: true})
  furnished: boolean | null;

  @Field(()=> Number, {nullable: true})
  rate: number | null;

}

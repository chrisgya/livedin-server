import { InputType, Field } from "type-graphql";

@InputType()
export class EmailSubscriptionInput{

  @Field(()=> String, {nullable: true})
  id: string | null;

  @Field(()=> Date, {nullable: true})
  dateFrom: Date | null;

  @Field(()=> Date, {nullable: true})
  dateTo: Date | null;

  @Field(()=> Number, {nullable: true})
  offset: number | null;

  @Field(()=> Number, {nullable: true})
  limit: number | null;

}

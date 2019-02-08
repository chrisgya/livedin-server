import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class GeneralResponse {
  @Field()
  success: boolean;
  @Field()
  message: string;
}




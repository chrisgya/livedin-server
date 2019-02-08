import { ObjectType, Field } from "type-graphql";
@ObjectType()
export class YupErrorsResponse {
  @Field()
  path: string;
  @Field()
  message: string;
}

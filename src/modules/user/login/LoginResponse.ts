import { User } from "../../../entity/User";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class LoginResponse {
  @Field()
  message: string;
  @Field(()=>User, {nullable: true})
  user: User | null;
}

import { InputType, Field } from "type-graphql";

@InputType()
export class LoginInput {
  @Field()
  username_email: string;
  @Field()
  password: string
}

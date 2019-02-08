
import { InputType, Field } from "type-graphql";

@InputType()
export class ChangePasswordInput{

  @Field()
  username_email: string;

  @Field()
  password: string;

  @Field()
  newPassword: string;

  @Field()
  confirmpassword: string;
}

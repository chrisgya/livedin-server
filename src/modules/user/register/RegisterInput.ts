import { InputType, Field } from "type-graphql";

@InputType()
export class RegisterInput{

  @Field()
  username: string;

  @Field()
  email: string;
  
  @Field()
  firstname: string;

  @Field(()=> String, {nullable: true})
  middlename: string | null;

  @Field()
  lastname: string;

  @Field()
    password: string;

  @Field()
  confirmpassword: string;
}

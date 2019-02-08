import { InputType, Field } from "type-graphql";

@InputType()
export class CreateEmailSubscriptionInput{

  @Field()
  name: string;

  @Field()
  email: string; 
}


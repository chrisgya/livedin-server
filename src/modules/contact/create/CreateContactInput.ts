import { InputType, Field } from "type-graphql";

@InputType()
export class CreateContactInput{

  @Field()
  name: string;

  @Field()
  email: string; 
  
  @Field()
  title: string;

  @Field()
  message: string;
}


import { Field, ObjectType } from "type-graphql";
import { ContactUs } from "../../../entity/ContactUs";

@ObjectType()
export class ContactsResponse{

  @Field(()=> [ContactUs!], {nullable: true})
  contacts: ContactUs[] | null;

  @Field()
  hasMore: Boolean;
}


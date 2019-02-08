import { Field, ObjectType } from "type-graphql";
import { EmailSubscription } from "../../../entity/EmailSubscription";

@ObjectType()
export class EmailSubscriptionsResponse{

  @Field(()=> [EmailSubscription!], {nullable: true})
  emailSubscriptions: EmailSubscription[] | null;

  @Field()
  hasMore: Boolean;
}


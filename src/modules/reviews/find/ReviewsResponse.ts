import { Field, ObjectType } from "type-graphql";
import { Review } from "../../../entity/Review";

@ObjectType()
export class ReviewsResponse{

  @Field(()=> [Review!], {nullable: true})
  reviews: Review[] | null;

  @Field()
  hasMore: Boolean;
}


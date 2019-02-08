import { ObjectType, Field } from "type-graphql";
import { Review } from "../../../entity/Review";
import { GeneralResponse } from "../../../utils/generalResponse";

@ObjectType()
export class CreateUpdateResponse {
  @Field()
  generalResponse: GeneralResponse;

  @Field(()=>Review, {nullable: true})
  review: Review | null;
  
}



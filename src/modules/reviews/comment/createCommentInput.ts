import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCommentInput{
    @Field()
   // @IsUUID()
    review_id: string;

    @Field()
   // @Length(2, 5000)
    note: string;
}
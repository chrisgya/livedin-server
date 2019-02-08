import { Resolver, Mutation, Arg, Ctx, Authorized } from "type-graphql";

import {Comment} from "../../../entity/Comment";
import { MyContext } from "../../../types/MyContext";

import { CreateCommentInput } from "./createCommentInput";

@Resolver()
export class CreateCommentResolver {
  @Authorized()
  @Mutation(() => Comment, { nullable: true })
  async createComment(
    @Arg("data") {review_id, note}: CreateCommentInput,
    @Ctx() ctx: MyContext
  ): Promise<Comment | undefined> {
   
    return Comment.create({
      review_id,
      note,
      user_id: ctx.req.session!.userId,
    }).save();

  }
}

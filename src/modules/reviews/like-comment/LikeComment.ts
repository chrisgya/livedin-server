import { Resolver, Mutation, Arg, Ctx, Authorized } from "type-graphql";

import { MyContext } from "../../../types/MyContext";
import { getConnection } from "typeorm";
import { CommentLike } from "../../../entity/CommentLike";

@Resolver()
export class LikeCommentResolver {
  @Authorized()
  @Mutation(() => Number, { nullable: true })
  async likeComment(
    @Arg("comment_id") comment_id: string,
    @Ctx() ctx: MyContext
  ): Promise<Number | null> {
    if (!comment_id) {
      return null;
    }

    const like = await CommentLike.findOne({
      where: { comment_id, user_id: ctx.req.session!.userId },
    });
    if (like) {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(CommentLike)
        .where("id = :id", { id: like.id })
        .andWhere("user_id = :user_id", { user_id: ctx.req.session!.userId })
        .execute();

      return CommentLike.count({ where: { comment_id } });
    }

    await CommentLike.create({
      comment_id,
      user_id: ctx.req.session!.userId,
    }).save();

    return CommentLike.count({ where: { comment_id} });
  }
}

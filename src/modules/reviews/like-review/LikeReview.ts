import { Resolver, Mutation, Arg, Ctx, Authorized } from "type-graphql";

import { MyContext } from "../../../types/MyContext";
import { ReviewLike } from "../../../entity/ReviewLike";
import { getConnection } from "typeorm";

@Resolver()
export class LikeReviewResolver {
  @Authorized()
  @Mutation(() => Number, { nullable: true })
  async likeReview(
    @Arg("reviewId") reviewId: string,
    @Ctx() ctx: MyContext
  ): Promise<Number | null> {
    if (!reviewId) {
      return null;
    }

    const like = await ReviewLike.findOne({
      where: { review_id: reviewId, user_id: ctx.req.session!.userId },
    });
    if (like) {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(ReviewLike)
        .where("id = :id", { id: like.id })
        .andWhere("user_id = :user_id", { user_id: ctx.req.session!.userId })
        .execute();

      return ReviewLike.count({ where: { review_id: reviewId } });
    }

    await ReviewLike.create({
      review_id: reviewId,
      user_id: ctx.req.session!.userId,
    }).save();

    return ReviewLike.count({ where: { review_id: reviewId } });
  }
}

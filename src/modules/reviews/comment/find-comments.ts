import { Resolver, Ctx, Query, FieldResolver, Root } from "type-graphql";
import { MyContext } from "../../../types/MyContext";
import { Comment } from "../../../entity/Comment";
// import { ReviewLike } from "../../../entity/ReviewLike";


@Resolver(Comment)
export class FindCommentResolver {


  @Query(() => [Comment], {nullable: true})
  async findComment(
    @Ctx() _ctx: MyContext
    ): Promise<Comment[] | undefined> {
    
        return Comment.find();
       
}

@FieldResolver(() => Number, {nullable: true})
async numCommentLikes(@Root() root: Comment, @Ctx() ctx: MyContext) {
  const total = await ctx.commentLikesLoader.load(root.id);
  return total || null;
}

}
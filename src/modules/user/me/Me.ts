import { Resolver, Ctx, Query, Authorized } from "type-graphql";
import { User } from "../../../entity/User";
import { MyContext } from "../../../types/MyContext";


@Resolver()
export class MeResolver {

  @Authorized()
  @Query(() => User, { nullable: true, complexity: 10 })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    return User.findOne(ctx.req.session!.userId);
}
}
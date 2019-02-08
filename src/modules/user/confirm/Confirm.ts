import { Resolver, Mutation, Arg, Ctx } from "type-graphql";

import { User } from "../../../entity/User";
import { MyContext } from "../../../types/MyContext";
import { GeneralResponse, GeneralErrorResponse } from "../../../utils";

@Resolver()
 export class ConfirmResolver {

  @Mutation(() => GeneralResponse)
  async confirmAccount(
    @Arg("token") token: string,
    @Ctx() ctx: MyContext
  ): Promise<GeneralResponse> {
       
    const userId = await ctx.redis.get(token);
    if (!userId) {
      return GeneralErrorResponse('account confirmation failed');
    }

    await User.update({ id: userId }, { confirmed: true });
    await ctx.redis.del(token);

    return {success: true, message: 'success'}
  }
 }
  

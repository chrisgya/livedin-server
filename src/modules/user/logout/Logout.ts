

import { Resolver, Mutation, Ctx, Authorized } from "type-graphql";

import { logout } from "../../../utils/logout";
import { MyContext } from "../../../types/MyContext";

@Resolver()
export class LogoutResolver {

  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    const { userId } = ctx.session;
    if(userId){
   return logout(userId, ctx.session, ctx.redis, ctx.res);    
    }else{
      return false;
    }
  }
}



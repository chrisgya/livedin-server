

import { Resolver, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { User } from "../../../entity/User";

import { MyContext } from "../../../types/MyContext";
import { authFailedError, userNotFound, GeneralResponse, GeneralErrorResponse, CapitalizeFirstLetter } from "../../../utils";
import { UpdateProfileInput } from "./UpdateProfileInput";


@Resolver()
 export class UpdateProfileResolver{

  @Authorized()
  @Mutation(() => GeneralResponse)
   async updateProfile(
     @Arg("data") { firstname, middlename, lastname }: UpdateProfileInput, 
     @Ctx() ctx: MyContext ): Promise<GeneralResponse> {


    if (!ctx.req.session!.userId) {
      return GeneralErrorResponse(authFailedError);
    }

    const user = await User.findOne(ctx.req.session!.userId);
    if (!user) {
      return GeneralErrorResponse(userNotFound);
    }
   
    //user.username = username;
    user.firstname = CapitalizeFirstLetter(firstname)!;
    user.middlename = CapitalizeFirstLetter(middlename);
    user.lastname = CapitalizeFirstLetter(lastname)!;

    // if(user.email !== email.toLowerCase().trim()){
    // user.email = email.toLowerCase().trim();
    // user.confirmed = false;
    // }

    await user.save();
  
    // if(user.email !== email){
    //  await logout(ctx.req.session!.userId, ctx.session, ctx.redis, ctx.res);
    //   return {success: true, message: 'Please confirm your new email'}
    // }

    return {success: true, message: 'success'};
  }
 }
  
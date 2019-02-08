import bcrypt from "bcryptjs";
import { getConnection } from "typeorm";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";

import { User } from "../../../entity/User";
import { MyContext } from "../../../types/MyContext";
import { invalidLoginError, accountLockedError, SendConfirmationLink, GeneralResponse, GeneralErrorResponse } from "../../../utils";

import { LoginInput } from "../login/LoginInput";


@Resolver()
 export class RequestConfirmationLinkResolver {

  @Mutation(() => GeneralResponse)
  async requestConfirmationLink(
    @Arg("data") { username_email, password }: LoginInput,
    @Ctx() ctx: MyContext
  ): Promise<GeneralResponse> {
       

    const user = await getConnection()
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.email = :email", { email: username_email})
    .orWhere("user.username = :username", { username: username_email })
    .getOne();

    if (!user || !user.password) {
      return GeneralErrorResponse(invalidLoginError);
    }

    if (user.confirmed) {
      return GeneralErrorResponse('User already confirmed');
    }

    if (user.islocked) {
      return GeneralErrorResponse(accountLockedError);
    }


  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return GeneralErrorResponse(invalidLoginError);
  }


 // resend confirmation link after login sucessful

 if (process.env.NODE_ENV !== "test") {
  SendConfirmationLink(ctx.url, user.id, user.email, user.firstname);
}

return {success: true, message: 'success'}

  }
 }
  

import { getConnection } from "typeorm";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";

import { User } from "../../../entity/User";
import { GeneralResponse, forgotPasswordError, confirmEmailError, accountLockedError, createForgotPasswordLink, 
  sendEmail, sendEmailProd } from "../../../utils";
import { MyContext } from "../../../types/MyContext";

@Resolver()
 export class ForgotPasswordResolver {

  
  @Mutation(() =>GeneralResponse)
  async sendForgotPassword(
    @Arg("username_email") username_email: string,
    @Ctx() ctx: MyContext
  ): Promise<GeneralResponse> {
    
    const user = await getConnection()
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.email = :email", { email: username_email})
    .orWhere("user.username = :username", { username: username_email })
    .getOne();

    if (!user) {
        return {success: false, message: forgotPasswordError};
    }

    if (!user.confirmed) {
      return {success: false, message: confirmEmailError};
    }
    
    if (user.islocked) {
      return {success: false, message: accountLockedError};
    }
    
    //send a new token to user email
    if (process.env.NODE_ENV !== "test") {

        const link_url = await createForgotPasswordLink(
            process.env.FRONTEND_HOST as string,
            user.id,
           ctx.redis
          );

          const subject = 'Password Reset';
  
          if(process.env.NODE_ENV === 'development'){
          await sendEmail(
            user.email,
            link_url,
            "confirm email"
          );
          } else {
            
            const text =`Hello ${user.firstname}, You recently requested to reset your password. 
            Please click on the following link to reset your password: ${link_url}`;
            const bodyMsg =  'You recently requested to reset your password. Please click on the link below to reset your password';
            const urlTitle = 'Click here to reset your password';
  
           await sendEmailProd(user.email, subject , user.firstname, bodyMsg, text, urlTitle, link_url)
          } 
  
        }
    
        return {success: true, message: 'success'};
      }

  }
  

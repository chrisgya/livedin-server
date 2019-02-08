import bcrypt from "bcryptjs";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";

import { MyContext } from "../../../types/MyContext";
import { User } from "../../../entity/User";
import { forgotPasswordPrefix, expiredTokenError, ResponseWithValidationsClass, ResponseWithValidations } from "../../../utils";
import { ResetPasswordInput } from "./ResetPasswordInput";

import { formatYupError, resetPasswordSchema} from "../../../yup-schemas";


@Resolver()
 export class ResetPasswordResolver {
 
   @Mutation(() => [ResponseWithValidationsClass])
   async resetPassord(
     @Arg("data") data: ResetPasswordInput, 
     @Ctx() ctx: MyContext ): Promise<ResponseWithValidationsClass[]> {

      try {
        await resetPasswordSchema.validate(
           data,
          { abortEarly: false }
        );
      } catch (err) {
        return formatYupError(err);
      }

      const { token, password } = data;
      
        const redisKey = `${forgotPasswordPrefix}${token}`;

        const userId = await ctx.redis.get(redisKey);
        if (!userId) {
          return ResponseWithValidations(false, expiredTokenError);
        }

    
          const hashedPassword = await bcrypt.hash(password, parseInt(process.env.HASH_SALT!, 10));
    
          const updatePromise = User.update(
            { id: userId },
            {
              password: hashedPassword
            }
          );
    
          const deleteKeyPromise = ctx.redis.del(redisKey);
    
          await Promise.all([updatePromise, deleteKeyPromise]);
  
    
          return ResponseWithValidations();

  }
 }



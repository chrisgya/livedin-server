import bcrypt from "bcryptjs";
import { getConnection } from "typeorm";
import { Resolver, Mutation, Arg, Ctx, Authorized } from "type-graphql";

import { User } from "../../../entity/User";
import { MyContext } from "../../../types/MyContext";
import { formatYupError, changePasswordSchema} from "../../../yup-schemas";
import { invalidLoginError, confirmEmailError, accountLockedError, logout, ResponseWithValidationsClass, ResponseWithValidations } from "../../../utils";
import { ChangePasswordInput } from "./ChangePasswordInput";

@Resolver()
 export class ChangePasswordResolver {

  @Authorized()
  @Mutation(() => [ResponseWithValidationsClass])
  async changePassword(
    @Arg("data") data: ChangePasswordInput,
    @Ctx() ctx: MyContext
  ): Promise<ResponseWithValidationsClass[]> {
       
    try {
      await changePasswordSchema.validate(
         data,
        { abortEarly: false }
      );
    } catch (err) {
      console.log(formatYupError(err));
      return  formatYupError(err);
    }

    const { username_email ,newPassword, password } = data;

    const user = await getConnection()
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.email = :email", { email: username_email})
    .orWhere("user.userName = :username", { username: username_email })
    .getOne();

    if (!user || !user.password) {
      return ResponseWithValidations(false, invalidLoginError);
    }

    if (!user.confirmed) {
      return ResponseWithValidations(false, confirmEmailError);
    }

    if (user.islocked) {
      return ResponseWithValidations(false, accountLockedError);
    }

    
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return ResponseWithValidations(false, invalidLoginError);
  }

  const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.HASH_SALT!, 10));
    
  const updatePromise = User.update(
    { id: user.id },
    {
      password: hashedPassword
    }
  );

  const logoutPromise = logout(user.id, ctx.session, ctx.redis, ctx.res);

  await Promise.all([updatePromise, logoutPromise]);

  return ResponseWithValidations();

  }
 }
  

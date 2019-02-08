import bcrypt from "bcryptjs";
import { Resolver, Mutation, Ctx, Arg } from "type-graphql";
import { getConnection } from "typeorm";

import { loginSchema} from "../../../yup-schemas";

import { User } from "../../../entity/User";
import { invalidLoginError, confirmEmailError, accountLockedError, setAuthCookie } from "../../../utils";
import { MyContext } from "../../../types/MyContext";
import { LoginInput } from "./LoginInput";
import { LoginResponse } from "./LoginResponse";

@Resolver()
 export class LoginResolver {

  @Mutation(() => LoginResponse)
  async login(
    @Arg("data") data: LoginInput,
    @Ctx() ctx: MyContext
  ): Promise<LoginResponse> {
    
    try {
      await loginSchema.validate(data, { abortEarly: false });
    } catch (err) {      
      return response(invalidLoginError, null);
    }

    const { username_email, password } = data;

    const user = await getConnection()
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.email = :email", { email: username_email})
    .orWhere("user.username = :username", { username: username_email })
    .getOne();


    if (!user || !user.password) {
      return response(invalidLoginError, null);
    }

    if (!user.confirmed) {
      return response(confirmEmailError, null);
    }

    if (user.islocked) {
      return response(accountLockedError, null);
    }
    
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return response(invalidLoginError, null);
  }


      // login sucessful
      await setAuthCookie(ctx.req, user.id);

      //update lastlogin
      user.lastlogin = new Date();
      await user.save();

      return response('success', user);

  }
 }
  

 const response = (message : string, user: User | null) => {
  return  {message, user};
 }
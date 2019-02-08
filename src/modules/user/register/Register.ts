import bcrypt from "bcryptjs";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";

import { formatYupError, createUserSchema} from "../../../yup-schemas";

import { createUser, SendConfirmationLink, ResponseWithValidationsClass, ResponseWithValidations } from "../../../utils";
import { RegisterInput } from "./RegisterInput";
import { MyContext } from "../../../types/MyContext";


@Resolver()
 export class RegisterResolver {
 
   @Mutation(() => [ResponseWithValidationsClass])
   async register(
     @Arg("data") data: RegisterInput, 
     @Ctx() ctx: MyContext ): Promise<ResponseWithValidationsClass[]> {

      try {
        await createUserSchema.validate(data, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const { email, username, middlename, firstname, lastname, password } = data;
      
    const hashedPassword =  await bcrypt.hash(password, parseInt(process.env.HASH_SALT!, 10));

    try {

    const user = await createUser(username, email, firstname, middlename, lastname, 
      hashedPassword, 'l', null, null, null, null);

      if (process.env.NODE_ENV !== "test") {
        SendConfirmationLink(ctx.url, user.id, email, firstname);
      }

    } catch (err) {
       console.log(err);
      const { detail } = err;

      if (detail.includes("already exists.")) {
        if (detail.includes("email")) {
          return ResponseWithValidations(false,"email already in use");
        } else if (detail.includes("username")) {
          return ResponseWithValidations(false, "username already taken");
        }
      } else {
        return ResponseWithValidations(false, "user registration failed." );
      }
    }

    return ResponseWithValidations();
  }
 }
  

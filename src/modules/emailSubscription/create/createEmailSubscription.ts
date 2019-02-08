import { Resolver, Mutation, Arg } from "type-graphql";

import { GeneralResponse } from "../../../utils";
import { CreateEmailSubscriptionInput } from "./createEmailSubscriptionInput";
import { EmailSubscription } from "../../../entity/EmailSubscription";


@Resolver()
 export class CreateEmailSubscriptionResolver {
 
   @Mutation(() => GeneralResponse)
   async createmailSubscription(
     @Arg("data") { name, email }: CreateEmailSubscriptionInput): Promise<GeneralResponse> {

      const emailSub = await EmailSubscription.create({
        name, email
      }).save();

      if(emailSub){
        return { success: true, message: "success" } 
      }

      return { success: false, message: "failed to create contact" }

  }
 }
  

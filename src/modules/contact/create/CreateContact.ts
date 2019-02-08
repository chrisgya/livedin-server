import { Resolver, Mutation, Arg } from "type-graphql";

import { GeneralResponse } from "../../../utils";
import { CreateContactInput } from "./CreateContactInput";
import { ContactUs } from "../../../entity/ContactUs";


@Resolver()
 export class CreateContactResolver {
 
   @Mutation(() => GeneralResponse)
   async createContact(
     @Arg("data") { name, email, title, message }: CreateContactInput): Promise<GeneralResponse> {

      const contact = await ContactUs.create({
        name, email, title, message 
      }).save();

      if(contact){
        return { success: true, message: "success" } 
      }

      return { success: false, message: "failed to create contact" }

  }
 }
  

import { Resolver, Mutation, Arg, Authorized } from "type-graphql";

import { GeneralResponse } from "../../../utils";
import { ContactUs } from "../../../entity/ContactUs";
import { getConnection } from "typeorm";


@Resolver()
 export class DeleteContactResolver {
 
  @Authorized()
   @Mutation(() => GeneralResponse)
   async deleteContact( @Arg("id") id: string): Promise<GeneralResponse> {

      if(!id){
        return { success: false, message: "no id provided" }
      }

     const deletedContact = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(ContactUs)
    .where("id = :id", { id })
    .execute();

    if(deletedContact.affected === 1){
      return { success: true, message: "success" } 
    }

    return { success: false, message: "failed to delete contact" };
  }
 }
  

import { Resolver, Ctx, Query,  Arg, Authorized } from "type-graphql";
import { MyContext } from "../../../types/MyContext";
import { getConnection } from "typeorm";
import { ContactsResponse } from "./contactResponse";
import { ContactInput } from "./contactInput";
import { ContactUs } from "../../../entity/ContactUs";
// import { ReviewLike } from "../../../entity/ReviewLike";


@Resolver()
export class FindContactResolver {

  @Authorized()
  @Query(() => ContactsResponse, {nullable: true})
  async findContacts(
    @Arg("data") { id, dateFrom, dateTo, limit, offset }: ContactInput,
    @Ctx() _ctx: MyContext
    ): Promise<ContactsResponse> {

      if(id) {        
        const rev = await ContactUs.findOne(id);
       
        if(!rev){
          return {
            hasMore: false,
            contacts: null
          };
        }
       
        return {
          hasMore: false,
          contacts: [rev]
        };
      }

      if(!limit){
        limit = 20;
      }
  
      if(!offset){
        offset = 0;
      }


      let searchQuery = getConnection()
      .getRepository(ContactUs)
      .createQueryBuilder('r');

          if(dateFrom && dateTo){
            searchQuery = searchQuery.where(`created between :dateFrom AND :dateTo`, { dateFrom, dateTo });
          }
  

      const contacts = await searchQuery
      .skip(offset)
      .take(limit + 1)
      .orderBy('"created"', "DESC")
      .getMany();

      return {
              hasMore: contacts.length === limit + 1,
              contacts: contacts.slice(0, limit)
            };

}


}
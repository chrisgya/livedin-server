import { Resolver, Ctx, Query,  Arg, Authorized } from "type-graphql";
import { MyContext } from "../../../types/MyContext";
import { getConnection } from "typeorm";
import { EmailSubscriptionInput } from "./emailSubscriptionInput";
import { EmailSubscription } from "../../../entity/EmailSubscription";
import { EmailSubscriptionsResponse } from "./emailSubscriptionResponse";
// import { ReviewLike } from "../../../entity/ReviewLike";


@Resolver()
export class FindEmailSubscriptionsResolver {

  @Authorized()
  @Query(() => EmailSubscriptionsResponse, {nullable: true})
  async findEmailSubscriptions(
    @Arg("data") { id, dateFrom, dateTo, limit, offset }: EmailSubscriptionInput,
    @Ctx() _ctx: MyContext
    ): Promise<EmailSubscriptionsResponse> {

      if(id) {        
        const rev = await EmailSubscription.findOne(id);
       
        if(!rev){
          return {
            hasMore: false,
            emailSubscriptions: null
          };
        }
       
        return {
          hasMore: false,
          emailSubscriptions: [rev]
        };
      }

      if(!limit){
        limit = 20;
      }
  
      if(!offset){
        offset = 0;
      }


      let searchQuery = getConnection()
      .getRepository(EmailSubscription)
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
              emailSubscriptions: contacts.slice(0, limit)
            };

}


}
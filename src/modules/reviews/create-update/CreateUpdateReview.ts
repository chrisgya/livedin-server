import { Resolver, Mutation, Arg, Ctx, Authorized } from "type-graphql";

import { CreateUpdateReviewInput } from "./CreateUpdateReviewInput";
import { MyContext } from "../../../types/MyContext";
import { CreateReview } from "./creeateReview";
import { UpdateRview } from "./updateReview";
import { CreateUpdateResponse } from "./CreateUpdateResponse";


@Resolver()
 export class CreateUpdateReviewResolver {
 
  @Authorized()
   @Mutation(() => CreateUpdateResponse)
   async createUpdateReview(
     @Arg("data") input: CreateUpdateReviewInput, 
     @Ctx() ctx: MyContext ): Promise<CreateUpdateResponse> {

   const { id,
    property_type,
    property_name,
    property_desc,
    amenities,
    bedrooms,bathrooms,guestrooms,furnished,unitfloor,for_rent_by,rent_amount,rent_pay_period,currency,address,
    city,state,zip,country,lat,lng,video,title,details,rate,anonymous} = input;


    if(id){
      // update existing review
      const res = await UpdateRview(id, property_type, property_name, property_desc, amenities, bedrooms, bathrooms, 
        guestrooms, furnished, unitfloor, for_rent_by, rent_amount, rent_pay_period, currency, address, city, 
        state, zip, country, lat, lng, video, title, details, rate, anonymous );

        if(!res){
          return { generalResponse: {success: false, message: "Something went wrong. Update failed"}, review: null } 
        }else{
          return { generalResponse: {success: true, message: "update successful"}, review: res } 
        }

    } else {
      //creat new review
          const res = await CreateReview(property_type, 
            property_name, property_desc, amenities,
              bedrooms, bathrooms, guestrooms || 0, furnished, unitfloor, 
              for_rent_by, rent_amount, rent_pay_period, currency,
              address, city, state, zip, country, lat, 
              lng, video, title, details, rate, anonymous, ctx.req.session!.userId);

              if(!res){
                return { generalResponse: {success: false, message: "Something went wrong. New review failed"}, review: null } 
              }else{
                return { generalResponse: {success: true, message: "review successful"}, review: res } 
              }

    }

  }
 }
  

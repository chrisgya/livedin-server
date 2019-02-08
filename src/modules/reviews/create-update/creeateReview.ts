import { Review } from "../../../entity/Review";

export const CreateReview = (property_type: string, property_name: string, property_desc: string, amenities: string[] | null,
    bedrooms: number, bathrooms: number, guestrooms: number, furnished: boolean, unitfloor: string | null, 
    for_rent_by: string, rent_amount: number, rent_pay_period: string, currency: string,
    address: string, city: string, state: string, zip: string | null, country: string, lat: number | null, 
    lng: number | null, video: string | null,
    title: string, details: string, rate: number, anonymous: boolean, user_id: string ) => {

   return Review.create({
    property_type,
    property_name,
    property_desc,
    amenities,
    bedrooms,
    bathrooms,
    guestrooms,
    furnished,
    unitfloor,
    for_rent_by,
   rent_amount,
    rent_pay_period,  
    currency,
    address,
    city,
    state,
    zip,
    country,  
    lat,
    lng,
    video,
    title,
    details,
    rate,
    anonymous,
    user_id
    }).save()
}
import { Review } from "../../../entity/Review";

export const UpdateRview = async(id: string, property_type: string, property_name: string, property_desc: string, 
    amenities: string[] | null,
    bedrooms: number, bathrooms: number, guestrooms: number | null, furnished: boolean, unitfloor: string | null, 
    for_rent_by: string, rent_amount: number, rent_pay_period: string, currency: string,
    address: string, city: string, state: string, zip: string | null, country: string, lat: number | null, 
    lng: number | null, video: string | null,
    title: string, details: string, rate: number, anonymous: boolean
    ) => {

        const review = await Review.findOne(id);
        if(!review){
            return null;
        }

        if(review.property_type !==  property_type){
            review.property_type =  property_type;
        }
        if(review.property_name !==  property_name){
            review.property_name =  property_name;
        }
        if(review.property_desc !==  property_desc){
            review.property_desc =  property_desc;
        }
        if(review.amenities !==  amenities){
            review.amenities =  amenities;
        }
        if(review.bedrooms !==bedrooms  ){
            review.bedrooms = bedrooms ;
        }
        if(review.bathrooms !==bathrooms  ){
            review.bathrooms = bathrooms;
        }
        if(review.guestrooms !== guestrooms ){
            review.guestrooms = guestrooms ;
        }
        if(review.furnished !== furnished ){
            review.furnished = furnished ;
        }
        if(review.unitfloor !== unitfloor ){
            review.unitfloor = unitfloor ;
        }
        if(review.for_rent_by !== for_rent_by ){
            review.for_rent_by = for_rent_by ;
        }
        if(review.rent_amount !== rent_amount ){
            review.rent_amount = rent_amount ;
        }
        if(review.rent_pay_period !== rent_pay_period ){
            review.rent_pay_period = rent_pay_period ;
        }
        if(review.currency !== currency ){
            review.currency =  currency;
        }
        if(review.address !== address ){
            review.address = address ;
        }
        if(review.city !== city ){
            review.city = city ;
        }
        if(review.state !== state ){
            review.state = state ;
        }
        if(review.zip !== zip ){
            review.zip = zip ;
        }
        if(review.country !== country ){
            review.country = country ;
        }
        if(review.lat !==  lat){
            review.lat = lat ;
        }
        if(review.lng !== lng ){
            review.lng = lng ;
        }
       
        if(review.video !== video ){
            review.video = video ;
        }
        if(review.title !== title ){
            review.title = title ;
        }
        if(review.details !== details ){
            review.details = details ;
        }
        if(review.rate !== rate ){
            review.rate = rate ;
        }
        if(review.anonymous !== anonymous ){          
            review.anonymous =  anonymous;
        }

      return review.save();
}
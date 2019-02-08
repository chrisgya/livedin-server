import { InputType, Field } from "type-graphql";

@InputType()
export class CreateUpdateReviewInput{

  @Field(() => String, {nullable: true})
  id: string | null;

// property review
@Field()
// @Length(3, 50)
  property_type: string;

  @Field()
 // @Length(3, 50)
  property_name: string;

  @Field()
 // @Length(3, 225)
  property_desc: string;

  @Field(()=>[String!], {nullable: true})
  amenities: string[] | null;

  @Field()
  bedrooms: number;

  @Field()
  bathrooms: number;

  @Field(()=>Number, {nullable: true})
  guestrooms: number | null;

  @Field()
  furnished: boolean;

  @Field(()=>String, {nullable: true})
  unitfloor: string | null;

  @Field()
  //@Length(3, 100)
  for_rent_by: string;

  @Field()
  rent_amount: number;

  @Field()
  //@Length(2, 20)
  rent_pay_period: string; //(per week/month/year)

  @Field()
  //@Length(2, 20)
  currency: string;

  @Field()
  //@Length(3, 300)
  address: string;

  @Field()
 // @Length(3, 50)
  city: string;

  @Field()
//  @Length(3, 50)
  state: string;

  @Field(()=>String, {nullable: true})
// @MaxLength(20)
  zip: string | null;

  @Field()
 // @Length(3, 100)
  country: string;

  @Field(()=>Number,{nullable: true})
  lat: number | null;

  @Field(()=>Number,{nullable: true})
  lng: number | null;

  @Field(()=>String, {nullable: true})
 // @MaxLength(300)
  video: string | null;


  // review section

  @Field()
 // @Length(3, 200)
  title: string;

  @Field()
 // @Length(4, 10000)
  details: string;

  @Field()
  rate: number;
  
  @Field()
  anonymous: boolean;
}

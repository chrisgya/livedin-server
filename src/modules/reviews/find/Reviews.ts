import { Resolver, Ctx, Query,  Arg, FieldResolver, Root } from "type-graphql";
import { MyContext } from "../../../types/MyContext";
import { ReviewsInput } from "./ReviewsInput";
import { Review } from "../../../entity/Review";
import { getConnection } from "typeorm";
import { ReviewsResponse } from "./ReviewsResponse";
import { Comment } from "../../../entity/Comment";
// import { ReviewLike } from "../../../entity/ReviewLike";


@Resolver(Review)
export class FindReviewResolver {

  // @FieldResolver()
  // numLikes(@Root() root: Review) {
  //   return ReviewLike.count({ where: { review_id: root.id } });
  // }

  @Query(() => ReviewsResponse, {nullable: true})
  async findReviews(
    @Arg("data") {  id, self,  searchtext, limit, offset, filters }: ReviewsInput,
    @Ctx() ctx: MyContext
    ): Promise<ReviewsResponse> {

      if(id) {        
        const rev = await Review.findOne(id);
       
        if(!rev){
          return {
            hasMore: false,
            reviews: null
          };
        }
       
        return {
          hasMore: false,
          reviews: [rev]
        };
      }

      if(!limit){
        limit = 20;
      }
  
      if(!offset){
        offset = 0;
      }


      let searchQuery = getConnection()
      .getRepository(Review)
      .createQueryBuilder('r')
      .select([ 
        'r.id',
        'r.property_type',
        'r.property_name',
        'r.property_desc',
        'r.amenities',
        'r.bedrooms',
        'r.bathrooms',
        'r.guestrooms',
        'r.furnished',
        'r.unitfloor',
        'r.for_rent_by',
        'r.rent_amount',
        'r.rent_pay_period',
        'r.currency',
        'r.address',
        'r.city',
        'r.state',
        'r.zip',
        'r.country',
        'r.lat',
        'r.lng',
        'r.photos',
        'r.video',
        'r.title',
        'r.details',
        'r.rate',
        'r.anonymous',
        'r.inappropriate',
        'r.created',
        'r.modified',
        'r.user_id'
      ]);

      if(self){
              if(! ctx.req.session!.userId){
                return {
                  hasMore: false,
                  reviews: null
                };
              }
              searchQuery = searchQuery.where(`user_id = :user_id`, { user_id: ctx.req.session!.userId });
      } else {

          if(searchtext){
            searchQuery = searchQuery.where(`search_field @@ websearch_to_tsquery(:searchtext)`, { searchtext });
          }

          if(filters){
            if(filters.property_type){
              searchQuery = searchQuery.andWhere("property_type = :property_type", { property_type : filters.property_type });
            }
            if(filters.bedrooms){
              searchQuery = searchQuery.andWhere("bedrooms = :bedrooms", { bedrooms : filters.bedrooms });          
            }
            if(filters.bathrooms){
              searchQuery = searchQuery.andWhere("bathrooms = :bathrooms", { bathrooms : filters.bathrooms });         
            }
            if(filters.furnished){
              searchQuery = searchQuery.andWhere("furnished = :furnished", { furnished : filters.furnished });         
            }
            if(filters.rate){
              searchQuery = searchQuery.andWhere("rate >= :rate", { rate : filters.rate });         
            }
          }

    }

      const reviews = await searchQuery
      .skip(offset)
      .take(limit + 1)
      .orderBy('"created"', "DESC")
      .getMany();

      return {
              hasMore: reviews.length === limit + 1,
              reviews: reviews.slice(0, limit)
            };

}


@FieldResolver(() => Number, {nullable: true})
async numLikes(@Root() root: Review, @Ctx() ctx: MyContext) {
  const total = await ctx.reviewLikesLoader.load(root.id);
  return total || null;
}

@FieldResolver(() => [Comment!], {nullable: true})
async reviewComments(@Root() root: Review, @Ctx() ctx: MyContext) {
  const comment = await ctx.commentLoader.load(root.id);
  return comment || null;
}

// @FieldResolver(() => Number, {nullable: true})
// async numCommentLikes(@Root() root: Comment, @Ctx() ctx: MyContext) {
//   const total = await ctx.commentLikesLoader.load(root.id);
//   return total || null;
// }



}
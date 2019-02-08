
import { getRepository } from "typeorm";
import DataLoader from "dataloader";
import { ReviewLike } from "../entity/ReviewLike";


export const reviewLikesLoader = () =>
  new DataLoader(async (keys: string[]) => {
 
   const reviewLikes = await getRepository(ReviewLike)
   .createQueryBuilder("r")
   .select("r.review_id as id")
   .addSelect("COUNT(r.review_id)", "total")
   .groupBy("r.review_id")
   .having("r.review_id = ANY(:ids)", { ids: keys })
   .getRawMany();

    const likeMap: { [key: string]: Number } = {};

    reviewLikes.forEach(u => {
        likeMap[u.id] = u.total;
    });

    // O(n) * O(1)
    return keys.map(k => likeMap[k]);
  });


import { getRepository } from "typeorm";
import DataLoader from "dataloader";
import { CommentLike } from "../entity/CommentLike";


export const commentLikesLoader = () =>
  new DataLoader(async (keys: string[]) => {
 
   const commentLikes = await getRepository(CommentLike)
   .createQueryBuilder("c")
   .select("c.comment_id as id")
   .addSelect("COUNT(c.comment_id)", "total")
   .groupBy("c.comment_id")
   .having("c.comment_id = ANY(:ids)", { ids: keys })
   .getRawMany();

    const likeMap: { [key: string]: Number } = {};

    commentLikes.forEach(u => {
      likeMap[u.id] = u.total;
    });

    // O(n) * O(1)
    return keys.map(k => likeMap[k]);
  });

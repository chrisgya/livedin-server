import  DataLoader from "dataloader";
import { getRepository } from "typeorm";
import { Comment } from "../entity/Comment";

export const commentLoader = () =>
  new DataLoader(async (keys: string[]) => {
   
    const comments = await getRepository(Comment)
    .createQueryBuilder("r")
    .where("r.review_id = ANY(:ids)", { ids: keys })
    .getMany();

    const commentMap: { [key: string]: Comment[] } = {};

    comments.forEach(comment => {
        if(comment.review_id in commentMap){
            commentMap[comment.review_id].push(comment);
        } else {
            commentMap[comment.review_id] = [comment];
        }
    });

    // O(n) * O(1)
    return keys.map(k => commentMap[k]);
  });

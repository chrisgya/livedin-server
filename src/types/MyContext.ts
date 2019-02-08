import { Request, Response } from "express";
import { Redis } from "ioredis";
import  DataLoader from "dataloader";
 import { Comment } from "../entity/Comment";

export interface MyContext {
  redis: Redis;
  url: string;
  session: any;
  req: Request;
  res: Response;
  reviewLikesLoader: DataLoader<string, Number>;
  commentLikesLoader: DataLoader<string, Number>;
  commentLoader: DataLoader<string, Comment[]>;
}

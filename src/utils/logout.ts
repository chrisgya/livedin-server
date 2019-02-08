import { removeAllUsersSessions } from "./removeAllUsersSessions";
import { cookieName } from "./constants";

import { Response } from "express";
import { Redis } from "ioredis";

export const logout = async (userId: string, session: any, redis: Redis, res: Response) : Promise<Boolean> => {
  
    return new Promise((resolve, rej) =>
    session.destroy( async(err: any) => {
      if (err) {
        return rej(false);
      } 

     await removeAllUsersSessions(userId, redis);
     res.clearCookie(cookieName);
     return resolve(true);

    })
  );
   
}
import { redis } from "../redis";
import { userSessionIdPrefix } from "./constants";

export const setAuthCookie = async (req: any, id = '') => {
    if(!id) {
        id = req.user;
    }

        (req.session as any).userId = id;
        if (req.sessionID) {
            await redis.lpush(`${userSessionIdPrefix}${id}`, req.sessionID);
          }
}
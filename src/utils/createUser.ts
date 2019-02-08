import { User } from "../entity/User";

export const createUser = async(
  username: string,
  email: string, 
  firstname: string, 
  middlename: string|null, 
  lastname: string, 
    password: string|null, 
    logintype: string, 
    googleid: string|null, 
    facebookid: string|null, 
    twitterid: string|null, 
    pictureurl: string|null, 
    confirmed = false
    ): Promise<User> =>{  
    
   return User.create({
    username,
    email,
    firstname,
    middlename,
    lastname,
    password,
    logintype,
    googleid,
    facebookid,
    twitterid,
    pictureurl,
    confirmed
  }).save();

}
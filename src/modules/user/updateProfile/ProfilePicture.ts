import { Resolver, Mutation, Arg } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";

import { Upload } from "../../../types/Upload";
import { processUpload } from "../../../utils/processUpload";

@Resolver()
export class ProfilePictureResolver {
  @Mutation(() => Boolean)
  async addProfilePicture(
    @Arg("picture", () => GraphQLUpload)
    uploadfile: Upload): Promise<boolean> {
    return new Promise(async (resolve, reject) =>{
   
      const id = await processUpload(uploadfile);
      console.log('id:', id);
      if(id){
        return resolve(true);
      }
     
      return reject(false);
  
    
  });
}
}

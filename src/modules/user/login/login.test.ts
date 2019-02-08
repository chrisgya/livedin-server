import { Connection } from "typeorm";
import bcrypt from "bcryptjs";
import faker from "faker";

import { testConn } from "../../../test-utils/testConn";
import { gCall } from "../../../test-utils/gCall";
import { User } from "../../../entity/User";
import { confirmEmailError, invalidLoginError } from "../../../utils";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const loginMutation = `
mutation Login($data: LoginInput!) {
  login(
    data: $data
  ) {
    message
    user{
      id
      username
      email
      firstname
      middlename
      lastname
      pictureurl
      logintype
      isadmin
      created      
    }
  }
}
`;

describe("Login", () => {
  it("login user", async () => {

    const password =  faker.internet.password();
    const hashedPassword =  await bcrypt.hash(password, parseInt(process.env.HASH_SALT!, 10));

    const user = await User.create({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      firstname: faker.name.firstName(),
      middlename: null,
      lastname: faker.name.lastName(),
      password: hashedPassword,
      logintype: 'l',
      googleid: null, 
      facebookid: null, 
      twitterid: null, 
      pictureurl: null
    }).save();

    const loginCredential = {
      username_email: user.email,
      password
    };

// unconfirmed account login test
    const response = await gCall({
      source: loginMutation,
      variableValues: {
        data: loginCredential
      }
    });

    expect(response).toMatchObject({
      data: {
        login:{message: confirmEmailError, user: null}
      }
    });

    const dbUser = await User.findOne({ where: { email: user.email } });
    if(dbUser){
      dbUser.confirmed = true;
     await dbUser.save();
    }
  
    // confirmed valid login test
    const response2 = await gCall({
      source: loginMutation,
      variableValues: {
        data: loginCredential
      }
    });

    const result = response2.data;

    expect(result!.login.message).toBe("success");
    expect(result!.login.user.email).toBe(user.email);
    expect(result!.login.user.userName).toBe(user.username);
    expect(result!.login.user.firstName).toBe(user.firstname);
    expect(result!.login.user.lastName).toBe(user.lastname);


    // invalid Password test
    const invalidPasswordCredential = {
      username_email: user.email,
      password: faker.internet.password()
    };

    const invalidPasswordResponse = await gCall({
      source: loginMutation,
      variableValues: {
        data: invalidPasswordCredential
      }
    });

    expect(invalidPasswordResponse).toMatchObject({
      data: {
        login:{message: invalidLoginError, user: null}
      }
    });


// invalid email/username test
    const invalidEmailCredential = {
      username_email: faker.internet.email(),
      password
    };

    const invalidEmailResponse = await gCall({
      source: loginMutation,
      variableValues: {
        data: invalidEmailCredential
      }
    });

    expect(invalidEmailResponse).toMatchObject({
      data: {
        login:{message: invalidLoginError, user: null}
      }
    });



  });

  
});

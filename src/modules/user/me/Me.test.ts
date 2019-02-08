import { Connection } from "typeorm";
import faker from "faker";

import { testConn } from "../../../test-utils/testConn";
import { gCall } from "../../../test-utils/gCall";
import { User } from "../../../entity/User";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const meQuery = `
 {
  me {
    id
    username
    email
    firstname
    middlename
    lastname
    logintype
    pictureurl
     isadmin
  }
}
`;

describe("Me", () => {
  it("get user", async () => {
    const user = await User.create({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      firstname: faker.name.firstName(),
      middlename: null,
      lastname: faker.name.lastName(),
      password: faker.internet.password(),
      logintype: 'l',
      googleid: null, 
      facebookid: null, 
      twitterid: null, 
      pictureurl:null, 
    }).save();

    const response = await gCall({
      source: meQuery,
      userId: user.id
    });

    expect(response).toMatchObject({
      data: {
        me: {
      id: user.id,
      userName: user.username,
      email: user.email,
      firstName: user.firstname,
      middleName: null,
      lastName: user.lastname,
      loginType: "l",
      pictureUrl: null,
      isAdmin: false
        }
      }
    });
  });

  it("return null", async () => {
    const response = await gCall({
      source: meQuery
    });

    expect(response).toMatchObject({
      data: {
        me: null
      }
    });
  });
});

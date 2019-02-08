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

const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    success
    message
  }
}
`;

describe("Register", () => {
  it("create user", async () => {
    const user = {
      password: faker.internet.password(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      firstname: faker.name.firstName(),
      middlename: "",
      lastname: faker.name.lastName()      
    };

    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    });

    expect(response).toMatchObject({
      data: {
        register: {
          success: true,
          message: "success"
        }
      }
    });

    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.confirmed).toBeFalsy();
    expect(dbUser!.firstname).toBe(user.firstname);
    expect(dbUser!.lastname).toBe(user.lastname);
    expect(dbUser!.email).toBe(user.email);
    expect(dbUser!.username).toBe(user.username);
    expect(dbUser!.logintype).toBe('l');
  });
});

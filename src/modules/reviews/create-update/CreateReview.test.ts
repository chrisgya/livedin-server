import { Connection } from "typeorm";
import faker from "faker";

import { testConn } from "../../../test-utils/testConn";
import { gCall } from "../../../test-utils/gCall";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const createReviewMutation = `
mutation CreateReview($data: CreateUpdateReviewInput!) {
  createUpdateReview(
    data: $data
  ) {
    success
    message
  }
}
`;

describe("Register", () => {
  it("create review", async () => {
    const review = {
      property_type: faker.random.word(),
      property_name: faker.random.word(),
      property_desc: faker.lorem.sentence(),
      amenities: [],
      bedrooms: faker.random.number(10),
      bathrooms: faker.random.number(10),
      guestrooms: faker.random.number(10),
      furnished: faker.random.boolean(),
      unitfloor: faker.random.words(2),
      for_rent_by: faker.random.word(),
      rent_amount: +faker.finance.amount(),
      rent_pay_period: faker.random.words(2),
      currency: faker.finance.currencyCode(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
      country: faker.address.country(),
      lat: +faker.address.latitude(),
      lng: +faker.address.longitude(),
      video: faker.internet.url(),
      title: faker.lorem.sentence(),
      details: faker.lorem.paragraphs(10),
      rate: faker.random.number(5),
      anonymous: faker.random.boolean()  
    };

    const response = await gCall({
      source: createReviewMutation,
      variableValues: {
        data: review
      }
    });

    expect(response).toMatchObject({
      data: {
        createUpdateReview: {
          success: true,
          message: "success"
        }
      }
    });

    
  });
});

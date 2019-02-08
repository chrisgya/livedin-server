import { Connection } from "typeorm";
import faker from "faker";

import { testConn } from "../../../test-utils/testConn";
import { gCall } from "../../../test-utils/gCall";
import { Review } from "../../../entity/Review";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const UpdateReviewMutation = `
mutation UpdateReview($data: CreateUpdateReviewInput!) {
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

   const rev = await Review.create({
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
      anonymous: faker.random.boolean(),  
      user_id: faker.random.uuid()
      }).save()

    const review = {
      id: rev.id,
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
      source: UpdateReviewMutation,
      variableValues: {
        data: review
      },
      userId: rev.user_id
    });

    expect(response).toMatchObject({
      data: {
        createUpdateReview: {
          success: true,
          message: "success"
        }
      }
    });

    const currentReview = await Review.findOne(rev.id);
    expect(currentReview!.id === rev.id);
    expect(currentReview!.property_type !== rev.property_type);
    expect(currentReview!.property_name !== rev.property_name);
    expect(currentReview!.title !== rev.title);    
  });
});

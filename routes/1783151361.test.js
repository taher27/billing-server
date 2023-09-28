// Import necessary modules
const express = require("express");
const CustomerModel = require("../models/customer");
const request = require('supertest');
const app = express();

// Test suite for the customer router
describe("Customer Router", () => {
  let server;

  // Setup and teardown
  beforeAll(() => {
    server = app.listen(4000);
  });

  afterAll(async () => {
    await server.close();
  });

  // Test case for successful patch
  test("PATCH /:id - success", async () => {
    const customer = new CustomerModel({ cname: "test", address: "test", phone: "1234567890", vat: "1234", pobox: "1234", region: "test" });
    await customer.save();

    const res = await request(server)
      .patch("/" + customer._id)
      .send({ cname: "updated", address: "updated", phone: "0987654321", vat: "4321", pobox: "4321", region: "updated" });

    expect(res.status).toBe(200);
    expect(res.body.cname).toBe("updated");
    expect(res.body.address).toBe("updated");
    expect(res.body.phone).toBe("0987654321");
    expect(res.body.vat).toBe("4321");
    expect(res.body.pobox).toBe("4321");
    expect(res.body.region).toBe("updated");
  });

  // Test case for error handling
  test("PATCH /:id - error", async () => {
    const res = await request(server)
      .patch("/invalid_id")
      .send({ cname: "updated", address: "updated", phone: "0987654321", vat: "4321", pobox: "4321", region: "updated" });

    expect(res.status).toBe(500);
    expect(res.text).toContain("Error");
  });
});

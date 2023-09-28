const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Customer = require('../models/customer');

describe('POST /', () => {
  beforeEach(() => {
    jest.spyOn(Customer.prototype, 'save').mockImplementation(() => Promise.resolve({ 
      cname: 'Test', 
      address: 'Test Address', 
      phone: '1234567890', 
      vat: 'Test VAT', 
      pobox: 'Test POBOX', 
      region: 'Test Region' 
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should save the customer and return 200', async () => {
    const res = await request(app)
      .post('/')
      .send({ 
        cname: 'Test', 
        address: 'Test Address', 
        phone: '1234567890', 
        vat: 'Test VAT', 
        pobox: 'Test POBOX', 
        region: 'Test Region' 
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ 
      cname: 'Test', 
      address: 'Test Address', 
      phone: '1234567890', 
      vat: 'Test VAT', 
      pobox: 'Test POBOX', 
      region: 'Test Region' 
    });
  });

  it('should return 500 if save fails', async () => {
    jest.spyOn(Customer.prototype, 'save').mockImplementation(() => Promise.reject(new Error('Test error')));

    const res = await request(app)
      .post('/')
      .send({ 
        cname: 'Test', 
        address: 'Test Address', 
        phone: '1234567890', 
        vat: 'Test VAT', 
        pobox: 'Test POBOX', 
        region: 'Test Region' 
      });

    expect(res.statusCode).toEqual(500);
    expect(res.text).toContain('error');
  });
});

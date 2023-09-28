const request = require('supertest');
const app = require('../app');
const CustomerModel = require('../models/CustomerModel');

jest.mock('../models/CustomerModel');

describe('PATCH /:id', () => {
  beforeEach(() => {
    CustomerModel.findById.mockClear();
  });

  test('should update the customer with the given id', async () => {
    const mockCustomer = { 
      cname: 'Test customer', 
      address: 'Test address',
      phone: 'Test phone',
      vat: 'Test vat',
      pobox: 'Test pobox',
      region: 'Test region',
      save: jest.fn().mockResolvedValue({
        cname: 'Updated customer',
        address: 'Updated address',
        phone: 'Updated phone',
        vat: 'Updated vat',
        pobox: 'Updated pobox',
        region: 'Updated region'
      }) 
    };

    CustomerModel.findById.mockResolvedValue(mockCustomer);

    const res = await request(app)
      .patch('/123')
      .send({
        cname: 'Updated customer',
        address: 'Updated address',
        phone: 'Updated phone',
        vat: 'Updated vat',
        pobox: 'Updated pobox',
        region: 'Updated region'
      });

    expect(CustomerModel.findById).toHaveBeenCalledWith('123');
    expect(mockCustomer.save).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      cname: 'Updated customer',
      address: 'Updated address',
      phone: 'Updated phone',
      vat: 'Updated vat',
      pobox: 'Updated pobox',
      region: 'Updated region'
    });
  });

  test('should return an error if customer not found', async () => {
    CustomerModel.findById.mockResolvedValue(null);

    const res = await request(app)
      .patch('/123')
      .send({
        cname: 'Updated customer',
        address: 'Updated address',
        phone: 'Updated phone',
        vat: 'Updated vat',
        pobox: 'Updated pobox',
        region: 'Updated region'
      });

    expect(CustomerModel.findById).toHaveBeenCalledWith('123');
    expect(res.statusCode).toBe(404);
    expect(res.text).toContain('No customer found with given id');
  });

  test('should return an error if database operation fails', async () => {
    CustomerModel.findById.mockRejectedValue(new Error('Test error'));

    const res = await request(app)
      .patch('/123')
      .send({
        cname: 'Updated customer',
        address: 'Updated address',
        phone: 'Updated phone',
        vat: 'Updated vat',
        pobox: 'Updated pobox',
        region: 'Updated region'
      });

    expect(CustomerModel.findById).toHaveBeenCalledWith('123');
    expect(res.statusCode).toBe(500);
    expect(res.text).toContain('Error');
  });
});

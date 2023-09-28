const express = require('express');
const request = require('supertest');

// Mock CustomerModel
const CustomerModel = {
  findById: jest.fn(),
  remove: jest.fn(),
};

// Mock express app
const app = express();
app.use(express.json());
app.delete('/:id', async (req, res) => {
  try {
    var id = req.params.id;
    const customer = await CustomerModel.findById(id);
    const data = await customer.remove();
    res.json(data);
  } catch (error) {
    console.log('error: ', error);
    res.status(500).send(error.message);
  }
});

describe('DELETE /:id', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should delete a customer successfully', async () => {
    const mockCustomer = { _id: '123', name: 'John Doe' };
    CustomerModel.findById.mockResolvedValue(mockCustomer);
    CustomerModel.remove.mockResolvedValue(mockCustomer);

    const response = await request(app).delete('/123');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCustomer);
    expect(CustomerModel.findById).toHaveBeenCalledWith('123');
    expect(CustomerModel.remove).toHaveBeenCalledWith(mockCustomer);
  });

  test('should return 500 when deletion fails', async () => {
    const mockError = new Error('Deletion failed');
    CustomerModel.findById.mockRejectedValue(mockError);

    const response = await request(app).delete('/123');

    expect(response.status).toBe(500);
    expect(response.text).toEqual('Deletion failed');
    expect(CustomerModel.findById).toHaveBeenCalledWith('123');
  });
});

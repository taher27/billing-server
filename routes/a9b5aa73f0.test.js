const express = require("express");
const CustomerModel = require("../models/customer");
const request = require('supertest');
const app = express();

describe('Test the root path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

    test('It should return customer data', async () => {
        CustomerModel.find = jest.fn().mockResolvedValue('customer');
        const response = await request(app).get('/');
        expect(response.text).toBe('customer');
    });

    test('It should handle errors', async () => {
        CustomerModel.find = jest.fn().mockRejectedValue('error');
        const response = await request(app).get('/');
        expect(response.text).toBe('error');
    });
});

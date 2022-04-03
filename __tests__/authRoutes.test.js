'use strict';

const { db } = require('../src/auth/models');
const { server } = require('../src/server.js');

const supertest = require('supertest');
const request = supertest(server);
const base64 = require('base-64');


beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('Testing Auth Routes', () => {
  it('user can be created on route /signup', async () => {
    let response = await request.post('/signup').send({
      username: 'test',
      password: 'test',
    });

    expect(response.status).toEqual(201);
    expect(response.body.token).toBeTruthy();
  });

  it('test allows valid user to log in on route /signin', async () => {
    let authString = 'test:test';
    let encodedString = await base64.encode(authString);
    let response = await request.post('/signin').set('Authorization', `Basic ${encodedString}`);

    expect(response.status).toEqual(201);
    expect(response.body.user.username).toEqual('test');
  });
})
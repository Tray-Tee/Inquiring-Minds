'use strict';

const { database, questionCollection, answerCollection } = require('../src/models')
const { db, users } = require('../src/auth/models/index.js');
const { server } = require('../src/server');
const supertest = require('supertest');
const request = supertest(server);

const testUsers = [];

beforeAll(async () => {
  await database.sync();
  await db.sync();

    await questionCollection.create({
        name: 'Question 1',
        questionID: 1,
    });
    await answerCollection.create({
        name: 'Answer 1',
    });

    await createClients();
})

afterAll(async () => {
  await database.drop();
  await db.drop();
})

//This creates our users to test acl with collection routes
async function createClients() {
    let fakeAdmin = await users.create({
      username: 'admin',
      password: 'password',
      role: 'admin',
    });
    let fakeEditor = await users.create({
      username: 'editor',
      password: 'password',
      role: 'editor',
    });
    let fakeUser = await users.create({
      username: 'user',
      password: 'password',
      role: 'user',
    });

    testUsers.push(fakeUser);
    testUsers.push(fakeEditor);
    testUsers.push(fakeAdmin);
}

  describe('Default User tests on Question Collection routes', () => {

    it('should authorize a default user to read from /api/QA/questionCollection', async () => {
      let response = await request.get('/api/QA/questionCollection').set('Authorization', `Bearer ${testUsers[0].token}`);

      expect(response.status).toEqual(200);
      expect(response.body.length).toBeTruthy();
    })

    it('should not authorize a default user to post a question to /api/QA/questionCollection', async () => {
      let response = await request.post('/api/QA/questionCollection').set('Authorization', `Bearer ${testUsers[0].token}`);

      expect(response.status).toEqual(500);
      expect(response.body.message).toEqual('Access Denied')
    })

    it('should not authorize a user to update to /api/QA/questionCollection/:id', async () => {
      let response = await request.put('/api/QA/questionCollection/1').set('Authorization', `Bearer ${testUsers[0].token}`);

      expect(response.status).toEqual(500);
      expect(response.body.message).toEqual('Access Denied');
    })

    it('should not authorize a user to delete to /api/QA/questionCollection/:id', async () => {
      let response = await request.delete('/api/QA/questionCollection/1').set('Authorization', `Bearer ${testUsers[0].token}`);

      expect(response.status).toEqual(500);
      expect(response.body.message).toEqual('Access Denied');
    });
  })

  describe('Default User tests on Answer Collection routes', () => {

    it('should authorize a default user to read from /api/QA/answerCollection', async () => {
      let response = await request.get('/api/QA/answerCollection').set('Authorization', `Bearer ${testUsers[0].token}`);

      expect(response.status).toEqual(200);
      expect(response.body.length).toBeTruthy();
    })

    it('should not authorize a default user to post a question to /api/QA/answerCollection', async () => {
      let response = await request.post('/api/QA/answerCollection').set('Authorization', `Bearer ${testUsers[0].token}`);

      expect(response.status).toEqual(500);
      expect(response.body.message).toEqual('Access Denied')
    })

    it('should not authorize a user to update to /api/QA/answerCollection/:id', async () => {
      let response = await request.put('/api/QA/answerCollection/1').set('Authorization', `Bearer ${testUsers[0].token}`);

      expect(response.status).toEqual(500);
      expect(response.body.message).toEqual('Access Denied');
    })

    it('should not authorize a user to delete to /api/QA/answerCollection/:id', async () => {
      let response = await request.delete('/api/QA/answerCollection/1').set('Authorization', `Bearer ${testUsers[0].token}`);

      expect(response.status).toEqual(500);
      expect(response.body.message).toEqual('Access Denied');
    });
  })


  describe('Editor Tests for Question Collection Routes', () => {
      
    it('should authorize an editor to read to /api/QA/questionCollection', async () => {
      let response = await request.get('/api/QA/questionCollection').set('Authorization', `Bearer ${testUsers[1].token}`);

      expect(response.status).toEqual(200);
      expect(response.body.length).toBeTruthy();
    });

    it('should authorize an editor to create a question POST: /api/QA/questionCollection', async () => {
      let response = await request.post('/api/QA/questionCollection')
      .set('Authorization', `Bearer ${testUsers[1].token}`)
      .send({
        name: "test",
        questionID: 2
    });

      expect(response.status).toEqual(201);
      expect(response.body.name).toEqual("test")
      expect(response.body.questionID).toEqual(2)

    });

    it('should authorize an editor to put to /api/QA/questionCollection/:id', async () => {
      let response = await request.put('/api/QA/questionCollection/1').set('Authorization', `Bearer ${testUsers[1].token}`)

      expect(response.status).toEqual(200);
    });

    it('should not authorize an editor to delete to /api/QA/questionCollection/:id', async () => {
      let response = await request.delete('/api/QA/questionCollection/1').set('Authorization', `Bearer ${testUsers[1].token}`);

      expect(response.status).toEqual(500);
      expect(response.body.message).toEqual('Access Denied');
    });
  });


  describe('Admin Tests for Question Collection Routes', () => {

    it('should authorize an admin to read from ', async () => {
      let response = await request.get('/api/QA/questionCollection').set('Authorization', `Bearer ${testUsers[2].token}`);

      expect(response.status).toEqual(200);
      expect(response.body.length).toBeTruthy();
    });

    it('should authorize an admin to post to /api/QA/questionCollection', async () => {
      let response = await request.post('/api/QA/questionCollection').set('Authorization', `Bearer ${testUsers[2].token}`).send({
        name: "test 2",
        questionID: 3
    });;

      expect(response.status).toEqual(201);
      expect(response.body.name).toEqual("test 2")
      expect(response.body.questionID).toEqual(3)
    });

    it('should authorize an admin to update to /api/QA/questionCollection/:id', async () => {
      let response = await request.put('/api/QA/questionCollection/1').set('Authorization', `Bearer ${testUsers[2].token}`);

      expect(response.status).toEqual(200);
    });

    it('should authorize an admin to delete /api/QA/questionCollection/:id', async () => {
      let response = await request.delete('/api/QA/questionCollection/1').set('Authorization', `Bearer ${testUsers[2].token}`);

      expect(response.status).toEqual(200);
      expect(response.body.id).toEqual(1);
    });

  })


  describe('Editor Tests for Answer Collection Routes', () => {

    it('should authorize an editor to read to /api/QA/answerCollection', async () => {
      let response = await request.get('/api/QA/answerCollection').set('Authorization', `Bearer ${testUsers[1].token}`);

      expect(response.status).toEqual(200);
      expect(response.body.length).toBeTruthy();
    });

    it('should authorize an editor to create a question POST: /api/QA/answerCollection', async () => {
      let response = await request.post('/api/QA/answerCollection')
      .set('Authorization', `Bearer ${testUsers[1].token}`)
      .send({
        name: "test",
        questionID: 2
    });

      expect(response.status).toEqual(201);
      expect(response.body.name).toEqual("test")
      expect(response.body.questionID).toEqual(2)

    });

    it('should authorize an editor to put to /api/QA/answerCollection/:id', async () => {
      let response = await request.put('/api/QA/answerCollection/1').set('Authorization', `Bearer ${testUsers[1].token}`)

      expect(response.status).toEqual(200);
    });

    it('should not authorize an editor to delete to /api/QA/answerCollection/:id', async () => {
      let response = await request.delete('/api/QA/answerCollection/1').set('Authorization', `Bearer ${testUsers[1].token}`);

      expect(response.status).toEqual(500);
      expect(response.body.message).toEqual('Access Denied');
    });
  });


  describe('Admin Tests for Answer Collection Routes', () => {

    it('should authorize an admin to read from ', async () => {
      let response = await request.get('/api/QA/answerCollection').set('Authorization', `Bearer ${testUsers[2].token}`);

      expect(response.status).toEqual(200);
      expect(response.body.length).toBeTruthy();
    });

    it('should authorize an admin to post to /api/QA/answerCollection', async () => {
      let response = await request.post('/api/QA/answerCollection').set('Authorization', `Bearer ${testUsers[2].token}`).send({
        name: "test 2",
        questionID: 3
    });;

      expect(response.status).toEqual(201);
      expect(response.body.name).toEqual("test 2")
      expect(response.body.questionID).toEqual(3)
    });

    it('should authorize an admin to update to /api/QA/answerCollection/:id', async () => {
      let response = await request.put('/api/QA/answerCollection/1').set('Authorization', `Bearer ${testUsers[2].token}`);

      expect(response.status).toEqual(200);
    });

    it('should authorize an admin to delete /api/QA/answerCollection/:id', async () => {
      let response = await request.delete('/api/QA/answerCollection/1').set('Authorization', `Bearer ${testUsers[2].token}`);

      expect(response.status).toEqual(200);
      expect(response.body.id).toEqual(1);
    });

  })


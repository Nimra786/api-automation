const { faker } = require('@faker-js/faker');
import createUserData from '../../../fixtures/createUserData.json';

describe('Create User API Tests', () => {
    const baseUrl = Cypress.config('baseUrl');
  
    it('POST - Create user with valid name and job', () => {
      const user = createUserData.users.user1;

      cy.request({
        method: 'POST',
        url: `${baseUrl}/users`,
        body: user
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('name', user.name);
        expect(response.body).to.have.property('job', user.job);
        expect(response.body).to.have.property('id').that.is.a('string');
        expect(response.body).to.have.property('createdAt').that.is.a('string');
      });
    });
  
    it('POST - Create user with only name', () => {
      const user = createUserData.users.user2;
  
      cy.request({
        method: 'POST',
        url: `${baseUrl}/users`,
        body: user
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('name', user.name);
        expect(response.body).not.to.have.property('job');
        expect(response.body).to.have.property('id').that.is.a('string');
        expect(response.body).to.have.property('createdAt').that.is.a('string');
      });
    });
  
    it('POST - Create user with only job', () => {
      const user = createUserData.users.user3;
  
      cy.request({
        method: 'POST',
        url: `${baseUrl}/users`,
        body: user
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).not.to.have.property('name');
        expect(response.body).to.have.property('job', user.job);
        expect(response.body).to.have.property('id').that.is.a('string');
        expect(response.body).to.have.property('createdAt').that.is.a('string');
      });
    });
  
    it('POST - Create user with empty body', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/users`,
        body: {}
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).not.to.have.property('name');
        expect(response.body).not.to.have.property('job');
        expect(response.body).to.have.property('id').that.is.a('string');
        expect(response.body).to.have.property('createdAt').that.is.a('string');
      });
    });
  
    it('POST - Create user with empty name and job parameter', () => {
      const user = createUserData.users.user4;
  
      cy.request({
        method: 'POST',
        url: `${baseUrl}/users`,
        body: user
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('name', user.name);
        expect(response.body).to.have.property('job', user.job);
        expect(response.body).to.have.property('id').that.is.a('string');
        expect(response.body).to.have.property('createdAt').that.is.a('string');
      });
    });
  
    it('POST - Create user with special characters in name and job', () => {
      const user = createUserData.users.user5;
  
      cy.request({
        method: 'POST',
        url: `${baseUrl}/users`,
        body: user
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('name', user.name);
        expect(response.body).to.have.property('job', user.job);
        expect(response.body).to.have.property('id').that.is.a('string');
        expect(response.body).to.have.property('createdAt').that.is.a('string');
      });
    });
  
    it('POST - Create user with numeric values in name and job', () => {
      const user = createUserData.users.user6;

      cy.request({
        method: 'POST',
        url: `${baseUrl}/users`,
        body: user
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('name', user.name);
        expect(response.body).to.have.property('job', user.job);
        expect(response.body).to.have.property('id').that.is.a('string');
        expect(response.body).to.have.property('createdAt').that.is.a('string');
      });
    });
  });
  
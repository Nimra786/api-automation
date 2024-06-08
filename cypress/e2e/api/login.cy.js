const { faker } = require('@faker-js/faker');
import { getRandomEmail, generateInvalidEmail } from '../../fixtures/data';

describe('User Login API Tests', () => {
  const baseUrl = Cypress.config('baseUrl');

  it('POST - Successful login with email', () => {
    const email = getRandomEmail();
    const password = faker.internet.password();

    cy.request('POST', `${baseUrl}/login`, {
      email: email,
      password: password
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
    });
  });

  it('POST - Successful login with username', () => {
    const email = getRandomEmail();
    const password = faker.internet.password();

    cy.request('POST', `${baseUrl}/login`, {
      username: email,
      password: password
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
    });
  });

  it('POST - Login fails with missing password using email', () => {
    const email = getRandomEmail();

    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      failOnStatusCode: false,
      body: {
        email: email
      }
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error', 'Missing password');
    });
  });

  it('POST - Login fails with missing password using username', () => {
    const username = getRandomEmail();

    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      failOnStatusCode: false,
      body: {
        username: username
      }
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error', 'Missing password');
    });
  });

  it('POST - Successful login with random acceptable reqres.in email', () => {
    const email = getRandomEmail();
    const password = faker.internet.password();

    cy.request('POST', `${baseUrl}/login`, {
      email: email,
      password: password
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
    });
  });

  it('POST - Successful login with random acceptable reqres.in username', () => {
    const username = getRandomEmail();
    const password = faker.internet.password();

    cy.request('POST', `${baseUrl}/login`, {
      username: username,
      password: password
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
    });
  });

  it('POST - Login fails with invalid email', () => {
    const email = generateInvalidEmail();
    const password = faker.internet.password();

    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      failOnStatusCode: false,
      body: {
        email: email,
        password: password
      }
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });
  });

  it('POST - Login fails with invalid username', () => {
    const username = generateInvalidEmail();
    const password = faker.internet.password();

    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      failOnStatusCode: false,
      body: {
        username: username,
        password: password
      }
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });
  });

  it('POST - Login fails with missing email and username', () => {
    const password = faker.internet.password();

    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      failOnStatusCode: false,
      body: {
        password: password
      }
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });
  });
});

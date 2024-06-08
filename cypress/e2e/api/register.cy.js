import { getRandomEmail, generateInvalidEmail } from '../../fixtures/data';
const { faker } = require('@faker-js/faker');

describe('User Registration API Tests', () => {
  const baseUrl = Cypress.config('baseUrl');

  it('POST - Successful registration with email', () => {
    const email = getRandomEmail();
    const password = faker.internet.password();

    cy.request('POST', `${baseUrl}/register`, {
      email: email,
      password: password
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('token');
    });
  });

  it('POST - Successful registration with username', () => {
    const username = getRandomEmail();
    const password = faker.internet.password();;

    cy.request('POST', `${baseUrl}/register`, {
      username: username,
      password: password
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('token');
    });
  });

  it('POST - Registration fails with missing password using email', () => {
    const email = getRandomEmail();

    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      failOnStatusCode: false,
      body: {
        email: email
      }
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error', 'Missing password');
    });
  });

  it('POST - Registration fails with missing password using username', () => {
    const username = getRandomEmail();

    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      failOnStatusCode: false,
      body: {
        username: username
      }
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error', 'Missing password');
    });
  });

  it('POST - Successful registration with random acceptable reqres.in email', () => {
    const email = getRandomEmail();
    const password = faker.internet.password();

    cy.request('POST', `${baseUrl}/register`, {
      email: email,
      password: password
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('token');
    });
  });

  it('POST - Successful registration with random acceptable reqres.in username', () => {
    const username = getRandomEmail();
    const password = faker.internet.password();

    cy.request('POST', `${baseUrl}/register`, {
      username: username,
      password: password
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('token');
    });
  });

  it('POST - Registration fails with invalid email', () => {
    const email = generateInvalidEmail();
    const password = faker.internet.password();;

    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
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

  it('POST - Registration fails with invalid username', () => {
    const username = generateInvalidEmail();
    const password = faker.internet.password();;

    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
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

  it('POST - Registration fails with missing email and username', () => {
    const password = faker.internet.password();;

    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
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

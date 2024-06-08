import {getRandomValidUserId} from '../../fixtures/data';
describe('Single User API Tests', () => {
    const baseUrl = Cypress.config('baseUrl');
  
    it('GET - Fetch single user with valid ID', () => {
      const userId = getRandomValidUserId();
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/users/${userId}`
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.data).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar');
        expect(response.body.data.id).to.equal(userId);
        expect(response.body.data.email).to.include('@reqres.in');
        expect(response.body.data.first_name).to.be.a('string');
        expect(response.body.data.last_name).to.be.a('string');
        expect(response.body.data.avatar).to.be.a('string');
        expect(response.body.support).to.have.property('url').that.is.a('string');
        expect(response.body.support).to.have.property('text').that.is.a('string');
      });
    });
  
    it('GET - Fetch single user with invalid ID (not found)', () => {
      const invalidUserId = 15; // Example of an invalid user ID
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/users/${invalidUserId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(404);
        expect(response.body).to.be.empty;
      });
    });
  
    it('GET - Fetch single user with string ID', () => {
      const stringUserId = 'abc'; // Example of a string user ID
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/users/${stringUserId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(404);
        expect(response.body).to.be.empty;
      });
    });
  
    it('GET - Fetch single user with ID of 0', () => {
      const invalidUserId = 0; // Example of an invalid user ID (out of range)
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/users/${invalidUserId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(404);
        expect(response.body).to.be.empty;
      });
    });
  
    it('GET - Fetch single user with negative ID', () => {
      const invalidUserId = -1; // Example of an invalid user ID (negative number)
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/users/${invalidUserId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(404);
        expect(response.body).to.be.empty;
      });
    });
  });
  
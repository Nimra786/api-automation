describe('Delete User API Tests', () => {
    const baseUrl = Cypress.config('baseUrl');
    const validUserIdRange = [1, 12];
  
    // Function to get a random valid user ID
    const getRandomValidUserId = () => {
      return Math.floor(Math.random() * (validUserIdRange[1] - validUserIdRange[0] + 1)) + validUserIdRange[0];
    };
  
    it('DELETE - Delete user with a valid ID', () => {
      const userId = getRandomValidUserId();
      const userUrl = `${baseUrl}/users/${userId}`;
  
      cy.request({
        method: 'DELETE',
        url: userUrl
      }).then((response) => {
        expect(response.status).to.equal(204);
        expect(response.body).to.be.empty;
      });
    });
  
    it('DELETE - Try to delete user with an invalid ID (negative)', () => {
      const invalidUserId = -1;
      const userUrl = `${baseUrl}/users/${invalidUserId}`;
  
      cy.request({
        method: 'DELETE',
        url: userUrl,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(204);
      });
    });
  
    it('DELETE - Try to delete user with an invalid ID (string)', () => {
      const invalidUserId = 'invalid';
      const userUrl = `${baseUrl}/users/${invalidUserId}`;
  
      cy.request({
        method: 'DELETE',
        url: userUrl,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(204);
      });
    });
  
    it('DELETE - Try to delete user without an ID', () => {
      const userUrl = `${baseUrl}/users/`;
  
      cy.request({
        method: 'DELETE',
        url: userUrl,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(204);
      });
    });
  });
  
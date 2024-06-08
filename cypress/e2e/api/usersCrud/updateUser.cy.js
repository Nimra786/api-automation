import updateUserData from '../../../fixtures/updateUserData.json';

describe('PUT - Update User API Tests', () => {
    const baseUrl = Cypress.config('baseUrl');
    const userId = 2;
    const userUrl = `${baseUrl}/users/${userId}`;
  
    it('PUT - Update user with valid name and job', () => {
      const userData = updateUserData.users.user1;

      cy.request({
        method: 'PUT',
        url: userUrl,
        body: userData
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('name', userData.name);
        expect(response.body).to.have.property('job', userData.job);
        expect(response.body).to.have.property('updatedAt').that.is.a('string');
      });
    });
  
    it('PUT - Update user with only name', () => {
      const userData = updateUserData.users.user2;
  
      cy.request({
        method: 'PUT',
        url: userUrl,
        body: userData
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('name', userData.name);
        expect(response.body).not.to.have.property('job');
        expect(response.body).to.have.property('updatedAt').that.is.a('string');
      });
    });

    it('PUT - Update user with only job', () => {
      const userData = updateUserData.users.user3;
  
      cy.request({
        method: 'PUT',
        url: userUrl,
        body: userData
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('job', userData.job);
        expect(response.body).not.to.have.property('name');
        expect(response.body).to.have.property('updatedAt').that.is.a('string');
      });
    });
  
    it('PUT - Update user with empty name and job', () => {
      const userData = updateUserData.users.user4;
  
      cy.request({
        method: 'PUT',
        url: userUrl,
        body: userData
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('name', userData.name);
        expect(response.body).to.have.property('job', userData.job);
        expect(response.body).to.have.property('updatedAt').that.is.a('string');
      });
    });

    it('PUT - Update user with special characters in name and job', () => {
      const userData = updateUserData.users.user5;

      cy.request({
        method: 'PUT',
        url: userUrl,
        body: userData
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('name', userData.name);
        expect(response.body).to.have.property('job', userData.job);
        expect(response.body).to.have.property('updatedAt').that.is.a('string');
      });
    });
  
    it('PUT - Update user with numeric values in name and job', () => {
      const userData = updateUserData.users.user6;
  
      cy.request({
        method: 'PUT',
        url: userUrl,
        body: userData
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('name', userData.name);
        expect(response.body).to.have.property('job', userData.job);
        expect(response.body).to.have.property('updatedAt').that.is.a('string');
      });
    });
    
    it('PUT - Update user with no body', () => {
      cy.request({
        method: 'PUT',
        url: userUrl,
        body: {}
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('updatedAt').that.is.a('string');
      });
    });
  });
  
  describe('PATCH - Update User API Tests', () => {
    const baseUrl = Cypress.config('baseUrl');
    const userId = 2;
    const userUrl = `${baseUrl}/users/${userId}`;
  
    it('PATCH - Update user with valid name and job', () => {
      const userData = updateUserData.users.user1;

      cy.request({
        method: 'PATCH',
        url: userUrl,
        body: userData
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('name', userData.name);
        expect(response.body).to.have.property('job', userData.job);
        expect(response.body).to.have.property('updatedAt').that.is.a('string');
      });
    });

    it('PATCH - Update user with only name', () => {
      const userData = updateUserData.users.user2;
  
      cy.request({
        method: 'PATch',
        url: userUrl,
        body: userData
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('name', userData.name);
        expect(response.body).not.to.have.property('job');
        expect(response.body).to.have.property('updatedAt').that.is.a('string');
      });
    });

    it('PATCH - Update user with only job', () => {
      const userData = updateUserData.users.user3;
  
      cy.request({
        method: 'PATCH',
        url: userUrl,
        body: userData
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('job', userData.job);
        expect(response.body).not.to.have.property('name');
        expect(response.body).to.have.property('updatedAt').that.is.a('string');
      });
    });
  
    it('PATCH - Update user with empty name and job', () => {
      const userData = updateUserData.users.user4;
  
      cy.request({
        method: 'PATCH',
        url: userUrl,
        body: userData
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('name', userData.name);
        expect(response.body).to.have.property('job', userData.job);
        expect(response.body).to.have.property('updatedAt').that.is.a('string');
      });
    });
  
  
    it('PATCH - Update user with special characters in name and job', () => {
      const userData = updateUserData.users.user5;
  
      cy.request({
        method: 'PATCH',
        url: userUrl,
        body: userData
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('name', userData.name);
        expect(response.body).to.have.property('job', userData.job);
        expect(response.body).to.have.property('updatedAt').that.is.a('string');
      });
    });
  
    it('PATCH - Update user with numeric values in name and job', () => {
      const userData = updateUserData.users.user5;
  
      cy.request({
        method: 'PATCH',
        url: userUrl,
        body: userData
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('name', userData.name);
        expect(response.body).to.have.property('job', userData.job);
        expect(response.body).to.have.property('updatedAt').that.is.a('string');
      });
    });
  
    it('PATCH - Update user with no body', () => {
      cy.request({
        method: 'PATCH',
        url: userUrl,
        body: {}
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('updatedAt').that.is.a('string');
      });
    });
  });
  
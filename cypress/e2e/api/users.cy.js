describe('User List API Tests', () => {
    const baseUrl = Cypress.config('baseUrl');

    it('GET - Fetch users with valid page and per_page parameters', () => {
        const page = 2;
        const perPage = 6;
    
        cy.request({
          method: 'GET',
          url: `${baseUrl}/users`,
          qs: {
            page: page,
            per_page: perPage
          }
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('page', page);
          expect(response.body).to.have.property('per_page', perPage);
          expect(response.body).to.have.property('total').that.is.a('number');
          expect(response.body).to.have.property('total_pages').that.is.a('number');
          expect(response.body.data).to.be.an('array');
          expect(response.body.support).to.have.property('url').that.is.a('string');
          expect(response.body.support).to.have.property('text').that.is.a('string');
    
          response.body.data.forEach(user => {
            expect(user).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar');
          });
        });
      });
    
      it('GET - Fetch users with valid page parameter only', () => {
        const page = 2;
    
        cy.request({
          method: 'GET',
          url: `${baseUrl}/users`,
          qs: {
            page: page
          }
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('page', page);
          expect(response.body).to.have.property('total').that.is.a('number');
          expect(response.body).to.have.property('total_pages').that.is.a('number');
          expect(response.body.data).to.be.an('array');
          expect(response.body.support).to.have.property('url').that.is.a('string');
          expect(response.body.support).to.have.property('text').that.is.a('string');
    
          response.body.data.forEach(user => {
            expect(user).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar');
          });
        });
      });
    
      it('GET - Fetch users with valid per_page parameter only', () => {
        const perPage = 6;
    
        cy.request({
          method: 'GET',
          url: `${baseUrl}/users`,
          qs: {
            per_page: perPage
          }
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('per_page', perPage);
          expect(response.body).to.have.property('total').that.is.a('number');
          expect(response.body).to.have.property('total_pages').that.is.a('number');
          expect(response.body.data).to.be.an('array');
          expect(response.body.support).to.have.property('url').that.is.a('string');
          expect(response.body.support).to.have.property('text').that.is.a('string');
    
          response.body.data.forEach(user => {
            expect(user).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar');
          });
        });
      });
    
      it('GET - Fetch users with invalid page parameter', () => {
        const invalidPage = 'invalid';
    
        cy.request({
          method: 'GET',
          url: `${baseUrl}/users`,
          failOnStatusCode: false,
          qs: {
            page: invalidPage
          }
        }).then((response) => {
          expect(response.status).to.equal(200);
        });
      });
    
      it('GET - Fetch users with invalid per_page parameter', () => {
        const invalidPerPage = 'invalid';
    
        cy.request({
          method: 'GET',
          url: `${baseUrl}/users`,
          failOnStatusCode: false,
          qs: {
            per_page: invalidPerPage
          }
        }).then((response) => {
          expect(response.status).to.equal(200);
        });
      });
    
      it('GET - Fetch users with missing page and per_page parameters', () => {
        cy.request({
          method: 'GET',
          url: `${baseUrl}/users`
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('page').that.is.a('number');
          expect(response.body).to.have.property('per_page').that.is.a('number');
          expect(response.body).to.have.property('total').that.is.a('number');
          expect(response.body).to.have.property('total_pages').that.is.a('number');
          expect(response.body.data).to.be.an('array');
          expect(response.body.support).to.have.property('url').that.is.a('string');
          expect(response.body.support).to.have.property('text').that.is.a('string');
    
          response.body.data.forEach(user => {
            expect(user).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar');
          });
        });
      });
});
  
describe('GET /api/users with delay parameter', () => {
    const baseUrl = Cypress.config('baseUrl');
    const delay = 10;
    const retries_count = Math.ceil(delay*1000/5000)
  
    // Function to send the request and wait for the response
    const sendRequestAndWait = (url, retries = retries_count) => {
      cy.request({ method: 'GET', url: url })
        .then((response) => {
          // If response status is 200, continue with assertions
          if (response.status === 200) {
            const body = response.body;
            
            // Verify response keys
            expect(body).to.have.property('page');
            expect(body).to.have.property('per_page');
            expect(body).to.have.property('total');
            expect(body).to.have.property('total_pages');
            expect(body).to.have.property('data');
            expect(body).to.have.property('support');
            
            // Verify data array and its keys
            body.data.forEach(user => {
              expect(user).to.have.property('id');
              expect(user).to.have.property('email');
              expect(user).to.have.property('first_name');
              expect(user).to.have.property('last_name');
              expect(user).to.have.property('avatar');
            });
  
            // Verify support keys
            expect(body.support).to.have.property('url');
            expect(body.support).to.have.property('text');
          } else if (retries > 0) {
            // If response status is not 200 and retries are available, retry after a delay
            cy.wait(1000).then(() => {
              sendRequestAndWait(url, retries - 1);
            });
          } else {
            // If maximum retries reached and data is not received, fail the test
            throw new Error('Maximum retries reached. Data not received.');
          }
        });
    };
  
    it('GET - Fetch users with delay parameter', () => {
      const url = `${baseUrl}/users?delay=${delay}`;
      sendRequestAndWait(url);
    });
  
    it('GET - Fetch users with invalid delay parameter (negative)', () => {
      const invalidDelay = -3;
      const url = `${baseUrl}/users?delay=${invalidDelay}`;
      cy.request({
        method: 'GET',
        url: url,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(200);  // Adjust based on actual API behavior
      });
    });
  
    it('GET - Fetch users with invalid delay parameter (string)', () => {
      const invalidDelay = 'invalid';
      const url = `${baseUrl}/users?delay=${invalidDelay}`;
      cy.request({
        method: 'GET',
        url: url,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(200);  // Adjust based on actual API behavior
      });
    });
  
    it('GET - Fetch users without delay parameter', () => {
      const url = `${baseUrl}/users`;
      cy.request(url).then((response) => {
        expect(response.status).to.equal(200);
        const body = response.body;
  
        // Verify response keys
        expect(body).to.have.property('page');
        expect(body).to.have.property('per_page');
        expect(body).to.have.property('total');
        expect(body).to.have.property('total_pages');
        expect(body).to.have.property('data');
        expect(body).to.have.property('support');
        
        // Verify data array and its keys
        body.data.forEach(user => {
          expect(user).to.have.property('id');
          expect(user).to.have.property('email');
          expect(user).to.have.property('first_name');
          expect(user).to.have.property('last_name');
          expect(user).to.have.property('avatar');
        });
  
        // Verify support keys
        expect(body.support).to.have.property('url');
        expect(body.support).to.have.property('text');
      });
    });
  });
  
  
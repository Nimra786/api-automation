describe('Single Unknown Resource API Tests', () => {
    const baseUrl = Cypress.config('baseUrl');
  
    // Function to generate a random valid unknown resource ID (1-12)
    const getRandomValidResourceId = () => {
      return Math.floor(Math.random() * 12) + 1;
    };
  
    it('GET - Fetch single unknown resource with valid ID', () => {
      const resourceId = getRandomValidResourceId();
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/unknown/${resourceId}`
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.data).to.have.all.keys('id', 'name', 'year', 'color', 'pantone_value');
        expect(response.body.data.id).to.equal(resourceId);
        expect(response.body.data.name).to.be.a('string');
        expect(response.body.data.year).to.be.a('number');
        expect(response.body.data.color).to.be.a('string');
        expect(response.body.data.pantone_value).to.be.a('string');
        expect(response.body.support).to.have.property('url').that.is.a('string');
        expect(response.body.support).to.have.property('text').that.is.a('string');
      });
    });
  
    it('GET - Fetch single unknown resource with invalid ID (not found)', () => {
      const invalidResourceId = 13; // Example of an invalid resource ID
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/unknown/${invalidResourceId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(404);
        expect(response.body).to.be.empty;
      });
    });
  
    it('GET - Fetch single unknown resource with string ID', () => {
      const stringResourceId = 'abc'; // Example of a string resource ID
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/unknown/${stringResourceId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(404);
        expect(response.body).to.be.empty;
      });
    });
  
    it('GET - Fetch single unknown resource with ID of 0', () => {
      const invalidResourceId = 0; // Example of an invalid resource ID (out of range)
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/unknown/${invalidResourceId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(404);
        expect(response.body).to.be.empty;
      });
    });
  
    it('GET - Fetch single unknown resource with negative ID', () => {
      const invalidResourceId = -1; // Example of an invalid resource ID (negative number)
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/unknown/${invalidResourceId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(404);
        expect(response.body).to.be.empty;
      });
    });
  });
  
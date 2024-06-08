describe('Unknown API Tests', () => {
    const baseUrl = Cypress.config('baseUrl');
  
    it('GET - Fetch list of unknown resources with valid parameters', () => {
      const page = 1;
      const perPage = 6;
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/unknown?page=${page}&per_page=${perPage}`
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('page', page);
        expect(response.body).to.have.property('per_page', perPage);
        expect(response.body).to.have.property('total').that.is.a('number');
        expect(response.body).to.have.property('total_pages').that.is.a('number');
        expect(response.body.data).to.be.an('array');
        response.body.data.forEach((item) => {
          expect(item).to.have.all.keys('id', 'name', 'year', 'color', 'pantone_value');
          expect(item.id).to.be.a('number');
          expect(item.name).to.be.a('string');
          expect(item.year).to.be.a('number');
          expect(item.color).to.be.a('string');
          expect(item.pantone_value).to.be.a('string');
        });
        expect(response.body.support).to.have.property('url').that.is.a('string');
        expect(response.body.support).to.have.property('text').that.is.a('string');
      });
    });
  
    it('GET - Fetch list of unknown resources with invalid page parameter', () => {
      const invalidPage = 'abc';
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/unknown?page=${invalidPage}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    });
  
    it('GET - Fetch list of unknown resources with missing parameters', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/unknown`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.page).to.exist;
        expect(response.body.per_page).to.exist;
        expect(response.body.total).to.exist;
        expect(response.body.total_pages).to.exist;
        expect(response.body.data).to.be.an('array');
        expect(response.body.support).to.exist;
      });
    });
  
    it('GET - Fetch list of unknown resources with invalid per_page parameter', () => {
      const invalidPerPage = 'xyz';
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/unknown?per_page=${invalidPerPage}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    });
  
    it('GET - Fetch single unknown resource with valid ID', () => {
      const validId = 2;
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/unknown/${validId}`
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.data).to.have.all.keys('id', 'name', 'year', 'color', 'pantone_value');
        expect(response.body.data.id).to.equal(validId);
        expect(response.body.data.name).to.be.a('string');
        expect(response.body.data.year).to.be.a('number');
        expect(response.body.data.color).to.be.a('string');
        expect(response.body.data.pantone_value).to.be.a('string');
        expect(response.body.support).to.have.property('url').that.is.a('string');
        expect(response.body.support).to.have.property('text').that.is.a('string');
      });
    });
  
    it('GET - Fetch single unknown resource with invalid ID', () => {
      const invalidId = 100;
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/unknown/${invalidId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(404);
      });
    });
  
    it('GET - Fetch single unknown resource with string ID', () => {
      const stringId = 'abc';
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/unknown/${stringId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(404);
      });
    });
  });
  
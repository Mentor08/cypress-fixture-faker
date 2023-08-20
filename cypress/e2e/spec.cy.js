describe('JSON parser', () => {
  it('Parses json file properly', () => {
    cy.visit('https://example.cypress.io');

    cy.fixture('example.json').then(parsedFile => {
      cy.log(parsedFile.name);
      cy.log(parsedFile.email);
      cy.log(parsedFile.body);
      cy.log(parsedFile.random1);
      cy.log(parsedFile.random2);
      cy.log(parsedFile.random3);
    });
  })
})
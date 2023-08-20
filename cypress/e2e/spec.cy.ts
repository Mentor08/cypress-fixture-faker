describe('JSON parser', () => {
  it('Parses json file properly', () => {
    cy.visit('https://example.cypress.io');

    cy.fixture('example.json').then(parsedFile => {
      cy.log(parsedFile.name);
      cy.log(parsedFile.email);
      cy.log(parsedFile.body);
      cy.log(parsedFile.int);
      cy.log(parsedFile.intParam);
      cy.log(parsedFile.intObjectParam);
      cy.log(parsedFile.string);
      cy.log(parsedFile.airline);
      cy.log(parsedFile.airline2);
      cy.log(parsedFile.color);
      cy.log(parsedFile.boolean);
      cy.log(parsedFile.between);
      cy.log(parsedFile.amount);
      cy.log(parsedFile.arrayElement);
    });
  });
});

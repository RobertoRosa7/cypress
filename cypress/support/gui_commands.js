Cypress.Commands.add('login', (name, password) => {
  cy.get('input[formcontrolname="password"]').type(password);
    cy.get('input[formcontrolname="userName"]').type(name);
    cy.get('button[type="submit"]').click();
})
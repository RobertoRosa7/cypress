describe('Login e Registro de usuário Alura Pic', () => {
  beforeEach(() => {
    cy.visit('https://alura-fotos.herokuapp.com');
  });

  it('Verificar mensagem de validação', () => {
    cy.contains('a', 'Register now').click();
    cy.contains('button', 'Register').click();
    cy.contains('ap-vmessage', 'Email is required').should('be.visible');

    cy.contains('button', 'Register').click();

    cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
    cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
    cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
  });

  it('Verificar mensagem de email invalido', () => {
    cy.contains('a', 'Register now').click();
    cy.contains('button', 'Register').click();
    cy.get('input[formcontrolname="email"]').type('jaqueline');
    cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');
  });

  it('Verificar senha com menos de 8 caracteres', () => {
    cy.contains('a', 'Register now').click();
    cy.contains('button', 'Register').click();
    cy.get('input[formcontrolname="password"]').type('1234');
    cy.contains('button', 'Register').click();
    cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');
  });

  it('Fazer login de usuário valido', () => {
    cy.login('flavio', '123');
    cy.contains('a', '(Logout)').should('be.visible');
  });

  it('Fazer login de usuário invalido', () => {
    cy.login('roberto', '1234');
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Invalid user name or password');
    });
  });

  const usuarios = require('../../fixtures/usuarios.json');
  usuarios.forEach((user) => {
    it.only(`Fazer novo Registro de usuário ${user.userName}`, () => {
      cy.contains('a', 'Register now').click();
      cy.contains('button', 'Register').click();
      cy.get('input[formcontrolname="email"]').type(user.email);
      cy.get('input[formcontrolname="fullName"]').type(user.fullName);
      cy.get('input[formcontrolname="userName"]').type(user.userName);
      cy.get('input[formcontrolname="password"]').type(user.password);
      cy.contains('button', 'Register').click();
    });
  });
});
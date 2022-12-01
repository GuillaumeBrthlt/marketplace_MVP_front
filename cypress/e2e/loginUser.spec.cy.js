describe('loginPage', () => {
  it('should login the user', () => {
    cy.visit('http://127.0.0.1:5173/login')
//    cy.get('[data-cy="connection-title"]').should('exist')
    cy.get('[name="email"]').should('exist')
  })
  it("Type data and submit form", () => {
    const email = "christelle.gevaert32@gmail.com"
    const password = "Valaug65"
    cy.get('[name="email"]')
    .type(email)
    cy.get('[name="password"]')
    .type(password)
    cy.get('[data-cy="signInBtn"]').click()
    cy.url().should('eq', 'http://127.0.0.1:5173/')
  })
})

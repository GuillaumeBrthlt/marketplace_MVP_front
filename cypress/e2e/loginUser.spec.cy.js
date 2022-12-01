describe('loginPage', () => {
  it('should login the user', () => {
    cy.visit('https://marketplace-mvp-front.vercel.app/login')
    cy.get('[name="email"]').should('exist')
  })
  it("Type data and submit form", () => {
    const email = "testing@email.fr"
    const password = "azerty"
    cy.get('[name="email"]')
    .type(email)
    cy.get('[name="password"]')
    .type(password)
    cy.get('[data-cy="signInBtn"]').click()
    cy.url().should('eq', 'https://marketplace-mvp-front.vercel.app/')
  })
})

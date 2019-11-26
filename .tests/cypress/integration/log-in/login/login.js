import faker from 'faker'

describe('Invalid credentials login test', () => {
  before(() => {
    cy.visit('/customer/account/')

    // Wait for the slowest part to be sure that the page is fully loaded
    cy.waitForCustomerData()
  })

  it('displays error message when user submits incorrect login credentials ', () => {
    cy.get('#email').type(faker.internet.email())
    cy.get('#pass').type('Password123')
    cy.get('[data-testid=submit-login-button]').click()
    cy.get('[data-ui-id="message-error"]').should('be.visible')
  })
})

describe('Valid credentials login test', () => {
  it('checks valid credentials login', () => {
    cy.fixture('user.json').then(({ login, password }) => {
      cy.get('#email')
        .clear()
        .type(login)
        .should('have.value', login)
      cy.get('#pass')
        .type(password)
        .should('have.value', password)
    })
    cy.get('[data-testid=submit-login-button]').click()

    // check user is redirected to account page after successful login
    cy.url().should('include', '/customer/account/index')
  })
})

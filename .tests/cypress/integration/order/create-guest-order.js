function pickRandomitem(items) {
  return items[Math.floor(Math.random() * items.length)]
}

// TODO: It's not making any orders
describe('Create order as guest', function() {
  before(() => {
    cy.addProductToCart()
    cy.fixture('urls.json').then(({ checkoutView }) => {
      cy.visit(checkoutView)
    })
  })

  it('Fill up shipping form', () => {
    cy.waitForCartData()
    cy.fillUpShippingAdressForm()
  })

  it('Choose shipping method and submit', () => {
    cy.get('.table-checkout-shipping-method')
      .find('.radio__icon')
      .then(items => {
        pickRandomitem(items).click(items)
      })
    cy.get('[data-testid=checkout-submit-button]').click()
  })

  it('Checks Billing and shipping adress are the same and place order', () => {
    cy.get('div.primary > .action > span').click()
    cy.get('.checkout-success').should('be.visible')
  })
})

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
  })
})

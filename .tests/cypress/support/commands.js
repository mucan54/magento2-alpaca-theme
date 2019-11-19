Cypress.Commands.add('login', () => {
  cy.fixture('user.json').then(({ login, password }) => {
    cy.visit('/customer/account/login/')
    cy.get('input[name="form_key"]')
      .invoke('val')
      .then(formKey => {
        cy.request({
          method: 'POST',
          url: '/customer/account/loginPost',
          form: true,
          body: {
            form_key: formKey,
            'login[username]': login,
            'login[password]': password
          }
        })
      })
  })
})

Cypress.Commands.add('goToProductPage', () => {
  cy.get('[data-testid=catalog-grid-item__link]').then(elements => {
    elements[Math.floor(Math.random() * elements.length)].click(elements)
  })
})

Cypress.Commands.add('addProductToCart', () => {
  cy.randomCategory()
  cy.goToProductPage()
  cy.get('.breadcrumbs__item')

  cy.get('.size .swatch__option')
    .as('Size')
    .then(elements => {
      elements[Math.floor(Math.random() * elements.length)].click(elements)
    })

  cy.get('.color .swatch__option').then(elements => {
    elements[Math.floor(Math.random() * elements.length)].click(elements)
  })

  cy.get('#product-addtocart-button')
    .first()
    .click()

  cy.get('[data-ui-id=message-success]')
    .should('be.visible')
    .log('product added to cart')
})

Cypress.Commands.add('nextPage', () => {
  cy.get('[data-testid=pager-next-link]').click()
})

Cypress.Commands.add('previousPage', () => {
  cy.get('[data-testid=pager-prev-link]').click()
})

Cypress.Commands.add('waitForCustomerData', () => {
  cy.server()
  cy.route('/customer/section/load/?sections=*').as('getCustomerData')
  cy.wait('@getCustomerData')
})

Cypress.Commands.add('waitForCartData', () => {
  cy.server()
  cy.route('/customer/section/load/?sections=cart*').as('getCartData')
  cy.wait('@getCartData')
})

Cypress.Commands.add('addProductToCart', () => {
  cy.fixture('urls.json').then(({ simpleProduct }) => {
    cy.visit(simpleProduct)
    cy.waitForCustomerData()
  })
  cy.get('#product-addtocart-button').click()
  cy.waitForCartData()
  // Check if the success message is displayed
  cy.get('.message.message--success').should('be.visible')
})

Cypress.Commands.add('fillUpShippingAdressForm', () => {
  cy.fixture('guestinfo.json').then(
    ({ firstName, lastName, street, city, zip, phone }) => {
      cy.get('#customer-email').type('qa@snow.dog')
      cy.get('[name=firstname]').type(firstName)
      cy.get('[name=lastname').type(lastName)
      cy.get('.input__field')
        .eq(9)
        .type(street)
      cy.get('[name=city]').type(city)
      cy.get('[name=region_id]').select(['49'])
      cy.get('[name=postcode]').type(zip)
      cy.get('[name=telephone]').type(phone)
    }
  )
})

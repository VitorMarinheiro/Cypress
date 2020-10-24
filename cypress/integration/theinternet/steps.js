import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given(/^the saucedemo website was accessed$/, () => {
	cy.visit('https://www.saucedemo.com/') 
	cy.get('[id=user-name]').should('be.visible')
});


When(/^user information is entered$/, () => {
	cy.get('[id=user-name]').type('standard_user')
	cy.get('[id=password]').type('secret_sauce')
	cy.get('[id=login-button]').click()
});

Then(/^the home page will be displayed$/, () => {
	cy.get('.product_label').should('be.visible')
});

Given(/^that the ordering was selected by "([^"]*)"$/, (ordenacao) => {
	cy.get('.product_sort_container').select(ordenacao)
});

When(/^the index item "([^"]*)" is selected$/, (posicao) => {
	cy.get('img[class=inventory_item_img]').eq(posicao).click()
});

Then(/^it will be added to the cart$/, () => {
	cy.get('.btn_primary').click()
});

When(/^the shopping cart is opened$/, () => {
	cy.get('path').click()
});

Then(/^the item will be removed from the cart$/, () => {
	cy.get('.item_pricebar > .btn_secondary').click().should('not.exist');
});

When(/^the last item is selected$/, () => {
	cy.get('img[class=inventory_item_img]').last().click()
});

Then(/^the request will be continued$/, () => {
	cy.get('.btn_action').click()
});

Given(/^that user data has been entered$/, () => {
	cy.get('[data-test=firstName]').type('Vitor')
	cy.get('[data-test=lastName]').type('Marinheiro')
	cy.get('[data-test=postalCode]').type('12345678')
	cy.get('.btn_primary').click()
});

When(/^the information confirmation screen is finished$/, () => {
	cy.get('.btn_action').click()
});

Then(/^the thank you message will be displayed$/, () => {
	cy.get('.complete-headersss').should('be.visible')
});
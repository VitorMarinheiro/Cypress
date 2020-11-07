import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

// Import das Pages
import login from '../../support/pages/login'
import listOfProducts from '../../support/pages/listOfProducts'
import product from '../../support/pages/product'
import cart from '../../support/pages/cart'
import informationsCheckout from '../../support/pages/informationsCheckout'
import checkoutOverview from '../../support/pages/checkoutOverview'
import finish from '../../support/pages/finish'

Given(/^the saucedemo website was accessed$/, () => {
	login.acessAndValidateLoginPage()
});

When(/^user information is entered$/, () => {
	login.logIntoTheSystem()
});

Then(/^the home page will be displayed$/, () => {
	listOfProducts.validatePage()
});

Then(/^the application state will be restarted$/, () => {
	listOfProducts.resetApplicationState()
});

Given(/^that the ordering was selected by "([^"]*)"$/, (order) => {
	listOfProducts.sortingProducts(order)
});

When(/^the index item "([^"]*)" is selected$/, (position) => {
	listOfProducts.selectItemWithIndex(position)
});

Then(/^it will be added to the cart$/, () => {
	product.addProductToCart()
});

When(/^the shopping cart is opened$/, () => {
	product.openCart()
});

Then(/^the item will be removed from the cart$/, () => {
	cart.validateRemovedItem()
});

When(/^the last item is selected$/, () => {
	cart.selectLastItem()
});

Then(/^the number of items equal to "([^"]*)" will be validated$/, (qt) => {
	cart.validateNumberOfItems(qt)
	cart.validatePrice()
});

Then(/^the request will be continued$/, () => {
	cart.continueRequest()
});

Given(/^that user data has been entered$/, () => {
	informationsCheckout.validatePage()
	informationsCheckout.insertInformations()
});

When(/^the information confirmation screen is finished$/, () => {
	checkoutOverview.validatePage()
	checkoutOverview.validateInformations()
	checkoutOverview.finishRequest()
});

Then(/^the thank you message will be displayed$/, () => {
	finish.validateSucess()
});
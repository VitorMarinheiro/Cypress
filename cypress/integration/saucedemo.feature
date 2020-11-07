@Saucedemo
Feature: Saucedemo

    As a user, I want to access the swaglab demo website
    To search for products and make purchases

Background: Log into the system
    Given the saucedemo website was accessed
    When user information is entered
    Then the home page will be displayed
    And the application state will be restarted

@OpenProduct
Scenario: Open more expensive product
    Given that the ordering was selected by "Price (high to low)"
    When the index item "0" is selected

@RemoveProduct
Scenario: Remove first product from shopping cart
    Given that the ordering was selected by "Name (A to Z)"
    When the index item "0" is selected
    Then it will be added to the cart
    When the shopping cart is opened
    Then the number of items equal to "1" will be validated
    And the item will be removed from the cart

@OpenProduct @BuyProduct
Scenario: Buy the last product on the list
    Given that the ordering was selected by "Name (A to Z)"
    When the last item is selected
    Then it will be added to the cart
    When the shopping cart is opened
    Then the number of items equal to "1" will be validated
    And the request will be continued
    Given that user data has been entered
    When the information confirmation screen is finished
    Then the thank you message will be displayed

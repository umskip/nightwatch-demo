@tag1 @tag2 @tag3
Feature: Add items to Cart and Checkout

    Scenario: Add items to Cart and Checkout
        Given I open and navigate to the web page
        Then I navigate to "Authentication" page
        When Make successful login
        And I navigate to "Home" page

        Then I Add Item "1" to Cart
        And I navigate to "Home" page
        And I Add Item "2" to Cart
        Then I navigate to "Home" page
          
        Then I Checkout and Pay the Items
        And I navigate to "Home" page
        And I Sign Out


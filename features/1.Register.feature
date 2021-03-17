@tag1 @tag2 @tag3
Feature: Register

    Scenario: Register
        Given I open and navigate to the web page
        Then I navigate to "Authentication" page
        When I Create New Account
        Then I navigate to "Home" page
        And I Sign Out




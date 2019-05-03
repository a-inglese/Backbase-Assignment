  Feature: As a User, I want to check edge cases for CRUD

    Scenario: Try to add a Computer with missing required name field
        Given I navigate to Computers List homepage
        And I click on "Add a new computer" button
        And I input a date on the introduced date field
        And I input a date on the discontinued date field
        And I select a company
        And I do not input a name on the name field
        When I click on "Create this computer" button
        Then I should stay on the Add Page section

    Scenario: Try to add a Computer with long name
        Given I navigate to Computers List homepage
        And I click on "Add a new computer" button
        And I input a very long name on the name field
        And I input a date on the introduced date field
        And I input a date on the discontinued date field
        And I select a company
        When I click on "Create this computer" button
        Then I should be redirected to the home page
        And I should see an alert message notifying that the computer was created correctly

    Scenario: Try to add a Computer with special characters on its name
        Given I navigate to Computers List homepage
        And I click on "Add a new computer" button
        And I input a name with special characters on the name field
        And I input a date on the introduced date field
        And I input a date on the discontinued date field
        And I select a company
        When I click on "Create this computer" button
        Then I should be redirected to the home page
        And I should see an alert message notifying that the computer was created correctly

    Scenario: Try to add a Computer with invalid date format
        Given I navigate to Computers List homepage
        And I click on "Add a new computer" button
        And I input a date on the introduced date field
        And I input a date on the discontinued date field
        And I select a company
        And I do not input a name on the name field
        When I click on "Create this computer" button
        Then I should stay on the Add Page section
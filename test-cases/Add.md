  Feature: As a User, I want to add a computer to the database from the Home Page

    Scenario: Add a Computer
        Given I navigate to Computers List homepage
        And I click on "Add a new computer" button
        And I input the name on the name field
        And I input a date on the introduced date field
        And I input a date on the discontinued date field
        And I select a company
        When I click on "Create this computer" button
        Then I should be redirected to the home page
        And I should see an alert message notifying that the computer was created correctly
        And I should see that the number of computers on the list is increased by 1
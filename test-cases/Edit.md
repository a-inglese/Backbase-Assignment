  Feature: As a User, I want to edit a computer from the database through the Home Page

    Scenario: Edit a Computer
        Given I already created a computer
        And I search for a previously created computer
        And I select a computer to edit
        And I edit the name on the name field
        When I click on "Save this computer" button
        Then I should be redirected to the home page
        And I should see an alert message notifying that the computer was created correctly
        And I should see that the number of computers on the database is the same as before editing
        And I should be able to find the computer by its new name

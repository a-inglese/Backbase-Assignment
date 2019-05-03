  Feature: As a User, I want to delete a computer previously created

    Scenario: Delete a Computer
        Given I already created a computer
        And I search for a previously created computer
        And I select the computer to delete
        When I click on delete button
        Then I should be redirected to the home page
        And I should see that the number of computers listed is decreased
        And I should see that the computer is not retrieved if I search for it
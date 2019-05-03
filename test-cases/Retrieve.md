  Feature: As a User, I want to retrieve a computer previously created in the database through the Home Page

    Scenario: Retrieve an exisiting Computer
        Given I already created a computer
        When I search for the name of a previously created computer using the searchbox
        Then I should see results
        And I should see that the computer I searched is displayed

    Scenario: Retrieve a non existing Computer
        Given I navigate to Computers List homepage
        And I search for the name of a non existing computer using the searchbox
        Then I should NOT see any results returned

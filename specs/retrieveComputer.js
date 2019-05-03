const fs = require('fs'),
moment = require('moment');
var pageObjectHelper = require('../helpers/pageObjectHelper')
    navigationHelper = require('../helpers/navigationHelper'),
    homePage = require('../page_object/homePage');
    resultsTable = require('../page_object/resultsTable');
    computerData = JSON.parse(fs.readFileSync('config/test_data/computerData.json', 'utf8')),

describe("Feature: As a User, I want to retrieve a computer previously created in the database through the Home Page", function() {

    beforeAll(function() {
        // Ignores synchronization with angular for non-angular page,
        isAngularSite(false);
        // Page object initialization
        this.PageObjectHelper = new pageObjectHelper();
        this.NavigationHelper = new navigationHelper();
        this.HomePage = new homePage();
        this.ResultsTable = new resultsTable();
        this.computerToRetrieve = computerData["computer_to_retrieve"];
        // add timestamp to computer name
        this.computerToRetrieve.name = computerData["computer_to_retrieve"].name + " " + moment().utcOffset(0).format('YYYY-MM-DD HH:mm:ss,SSS');

    });

        describe('Scenario: Retrieve an exisiting Computer', function() {

            it("Given I already created a computer", function () {
                this.NavigationHelper.goToHomePage();
                this.NavigationHelper.createComputer(this.computerToRetrieve)          
            });

            it("When I search for the name of a previously created computer using the searchbox", function () {
                this.HomePage.searchForComputer(this.computerToRetrieve.name);
            });

            it("Then I should see results", function () {
                expect(this.ResultsTable.getTableElement().isPresent()).toBe(true);
            });

            it("And I should see that the computer I searched is displayed", function () {
                expect(this.ResultsTable.getResultsQuantity()).toBe(1);
            });

        });

        describe('Scenario: Retrieve a non existing Computer', function() {


            it("Given I navigate to Computers List homepage", function () {
                this.NavigationHelper.goToHomePage();                
            });

            it("And I search for the name of a non existing computer using the searchbox", function () {
                this.HomePage.searchForComputer("thiscomputerdoesnotexist");
            });

            it("Then I should NOT see any results returned", function () {
                expect(this.ResultsTable.getTableElement().isPresent()).toBe(false);
            });

        });

    afterAll(function() {
        this.NavigationHelper.deleteComputer(this.computerToRetrieve.name);
    });
    

});

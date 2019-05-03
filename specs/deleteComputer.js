const fs = require('fs');
const moment = require('moment');
var pageObjectHelper = require('../helpers/pageObjectHelper')
    navigationHelper = require('../helpers/navigationHelper'),
    homePage = require('../page_object/homePage');
    formPage = require('../page_object/formPage')
    resultsTable = require('../page_object/resultsTable')
    computerData = JSON.parse(fs.readFileSync('config/test_data/computerData.json', 'utf8')),

describe("Feature: As a User, I want to delete a computer previously created", function() {

    beforeAll(function() {
        // Ignores synchronization with angular for non-angular page,
        isAngularSite(false);
        // Page object initialization
        this.PageObjectHelper = new pageObjectHelper();
        this.NavigationHelper = new navigationHelper();
        this.HomePage = new homePage();        
        this.FormPage = new formPage();
        this.ResultsTable = new resultsTable();
        this.computerToDelete = computerData["computer_to_delete"];
        // add timestamp to computer name
        this.computerToDelete.name = computerData["computer_to_delete"].name + " " + moment().utcOffset(0).format('YYYY-MM-DD HH:mm:ss,SSS');
    });

        describe('Scenario: Delete a Computer', function() {

            it("Given I already created a computer", function () {
                this.NavigationHelper.goToHomePage();
                this.NavigationHelper.createComputer(this.computerToDelete)          
            });

            it("And I search for a previously created computer", function () {
                this.HomePage.getNumberOfComputersFound().then(number => numberOfComputersAtStart = number);
                this.HomePage.searchForComputer(computerData["computer_to_delete"].name);
            });

            it("And I select the computer to delete", function () {
                this.ResultsTable.selectComputerFromSearch();
            });

            it("When I click on delete button", function () {
                this.FormPage.delete();
            });

            it("Then I should be redirected to the home page", function () {
                expect(this.HomePage.getTitleElement().isPresent()).toBeTruthy();
            });

            it("And I should see that the number of computers listed is decreased", function () {   
                expect(this.HomePage.getNumberOfComputersFound()).toBeLessThan(numberOfComputersAtStart);          
            });

            it("And I should see that the computer is not retrieved if I search for it", function () {
                this.HomePage.searchForComputer(this.computerToDelete.name);
                expect(this.ResultsTable.getTableElement().isPresent()).toBe(false);          
            });


        });

});

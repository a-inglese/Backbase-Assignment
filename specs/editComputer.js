const fs = require('fs'),
moment = require('moment');
var formPage = require('../page_object/formPage'),
    homePage = require('../page_object/homePage');
    resultsTable = require('../page_object/resultsTable');
    pageObjectHelper = require('../helpers/pageObjectHelper')
    navigationHelper = require('../helpers/navigationHelper'),
    computerData = JSON.parse(fs.readFileSync('config/test_data/computerData.json', 'utf8')),

describe("Feature: As a User, I want to edit a computer from the database through the Home Page", function() {

    beforeAll(function() {
        // Ignores synchronization with angular for non-angular page,
        isAngularSite(false);
        // Page object initialization
        this.PageObjectHelper = new pageObjectHelper();
        this.NavigationHelper = new navigationHelper();
        this.HomePage = new homePage();        
        this.FormPage = new formPage();
        this.ResultsTable = new resultsTable();
        this.computerToEdit = computerData["computer_to_edit"];
        // add timestamp to computer name
        this.computerToEdit.name = computerData["computer_to_edit"].name + " " + moment().utcOffset(0).format('YYYY-MM-DD HH:mm:ss,SSS');
        this.computerToEdit.newName = computerData["computer_to_edit"].newName + " " + moment().utcOffset(0).format('YYYY-MM-DD HH:mm:ss,SSS');
    });

        describe('Scenario: Edit a Computer', function() {

            it("Given I already created a computer", function () {
                this.NavigationHelper.goToHomePage();
                this.NavigationHelper.createComputer(this.computerToEdit)          
            });

            it("And I search for a previously created computer", function () {
                this.HomePage.getNumberOfComputersFound().then(number => numberOfComputersAtStart = number);
                this.HomePage.searchForComputer(this.computerToEdit.name);
            });

            it("And I select a computer to edit", function () {
                this.ResultsTable.selectComputerFromSearch();
            });

            it("And I edit the name on the name field", function () {
                this.FormPage.setName(this.computerToEdit.newName);
            });

            it("When I click on \"Save this computer\" button", function () {
                this.FormPage.save();
            });

            it("Then I should be redirected to the home page", function () {
                expect(this.HomePage.getTitleElement().isPresent()).toBeTruthy();
            });

            it("And I should see an alert message notifying that the computer was created correctly", function () {
                var alertMessageText = this.PageObjectHelper.getElementText(this.HomePage.getAlertMessage());
                expect(alertMessageText).toContain(this.computerToEdit.newName);        
            });

            it("And I should see that the number of computers on the database is the same as before editing", function () {   
                expect(numberOfComputersAtStart).toBe(this.HomePage.getNumberOfComputersFound());        
            });

            it("And I should be able to find the computer by its new name", function () {   
                this.HomePage.searchForComputer(this.computerToEdit.newName);    
            });


        });

    afterAll(function(){
        this.Resul;
    })

});

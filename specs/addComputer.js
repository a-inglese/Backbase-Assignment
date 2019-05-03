const fs = require('fs');
const moment = require('moment');
var addPage = require('../page_object/addPage'),
    pageObjectHelper = require('../helpers/pageObjectHelper')
    navigationHelper = require('../helpers/navigationHelper'),
    homePage = require('../page_object/homePage');
    computerData = JSON.parse(fs.readFileSync('config/test_data/computerData.json', 'utf8')),

describe("Feature: As a User, I want to add a computer to the database from the Home Page", function() {

    beforeAll(function() {
        // Ignores synchronization with angular for non-angular page,
        isAngularSite(false);
        // Page object initialization
        this.PageObjectHelper = new pageObjectHelper();
        this.NavigationHelper = new navigationHelper();
        this.HomePage = new homePage();        
        this.AddPage = new addPage();
        this.computerToRetrieve = computerData["correct_creation"];
        // add timestamp to computer name
        this.computerToRetrieve.name = computerData["correct_creation"].name + " " + moment().utcOffset(0).format('YYYY-MM-DD HH:mm:ss,SSS');
    });

        describe('Scenario: Add a Computer', function() {

            it("Given I navigate to Computers List homepage", function () {
                this.NavigationHelper.goToHomePage();                
                numberOfComputersAtStart = this.HomePage.getNumberOfComputersFound();
                expect(browser.isElementPresent(this.HomePage.getComputersTable())).toBe(true);
            });

            it("And I click on \"Add a new computer\" button", function () {
                self = this;
                this.HomePage.clickAddButton().then(function(){
                    let title = self.AddPage.getTitleElement();
                    self.NavigationHelper.waitForElement(title, 'Add page title not present. Are you on the correct page?');
                    expect(title.isPresent()).toBe(true);
                });
            });

            it("And I input the name on the name field", function () {
                this.AddPage.setName(computerData["correct_creation"].name);
                expect(this.AddPage.getNameInput().getAttribute('value')).toBe(computerData["correct_creation"].name);
            });

            it("And I input a date on the introduced date field", function () {
                this.AddPage.setIntroducedDate(computerData["correct_creation"].introduced)
                expect(this.AddPage.getIntroducedDateInput().getAttribute('value')).toBe(computerData["correct_creation"].introduced);
            });

            it("And I input a date on the discontinued date field", function () {
                this.AddPage.setDiscontinuedDate(computerData["correct_creation"].discontinued);
                expect(this.AddPage.getDiscontinuedDateInput().getAttribute('value')).toBe(computerData["correct_creation"].discontinued)
            });

            it("And I select a company", function () {
                this.AddPage.setCompany(computerData["correct_creation"].company);
                expect(this.AddPage.getCompanyInput().$('option:checked').getText()).toBe(computerData["correct_creation"].company)
            });

            it("When I click on \"Create this computer\" button", function () {
                this.AddPage.save();
            });

            it("Then I should be redirected to the home page", function () {
                expect(this.HomePage.getTitleElement().isPresent()).toBeTruthy();
            });

            it("And I should see an alert message notifying that the computer was created correctly", function () {
                var alertMessageText = this.PageObjectHelper.getElementText(this.HomePage.getAlertMessage());
                expect(alertMessageText).toContain(computerData["correct_creation"].name);        
            });

            it("And I should see that the number of computers on the list is increased by 1", function () {   
                expect(numberOfComputersAtStart).toBeLessThan(this.HomePage.getNumberOfComputersFound());        
            });

        });

    afterAll(function(){
        this.NumberOfComputersAtStart = this.HomePage.getNumberOfComputersFound();
    })

});

const fs = require('fs');
var pageObjectHelper = require('../helpers/pageObjectHelper')
    navigationHelper = require('../helpers/navigationHelper'),
    homePage = require('../page_object/homePage');
    formPage = require('../page_object/formPage')
    resultsTable = require('../page_object/resultsTable');
    computerData = JSON.parse(fs.readFileSync('config/test_data/computerData.json', 'utf8')),

describe("Feature: As a User, I want to check edge cases for CRUD", function() {

    beforeAll(function() {
        // Ignores synchronization with angular for non-angular page,
        isAngularSite(false);
        // Page object initialization
        this.PageObjectHelper = new pageObjectHelper();
        this.NavigationHelper = new navigationHelper();
        this.HomePage = new homePage();
        this.FormPage = new formPage();
        this.ResultsTable = new resultsTable();
    });


    describe('Scenario: Try to add a Computer with missing required name field', function() {


        it("Given I navigate to Computers List homepage", function () {
            this.NavigationHelper.goToHomePage();                
            expect(browser.isElementPresent(this.HomePage.getComputersTable())).toBe(true);
        });

        it("And I click on \"Add a new computer\" button", function () {
            self = this;
            this.HomePage.clickAddButton().then(function(){
                let title = self.FormPage.getTitleElement();
                self.NavigationHelper.waitForElement(title, 'Add page title not present. Are you on the correct page?');
                expect(title.isPresent()).toBe(true);
            });
        });

        it("And I input a date on the introduced date field", function () {
            this.FormPage.setIntroducedDate(computerData["correct_creation"].introduced)
            expect(this.FormPage.getIntroducedDateInput().getAttribute('value')).toBe(computerData["correct_creation"].introduced);
        });

        it("And I input a date on the discontinued date field", function () {
            this.FormPage.setDiscontinuedDate(computerData["correct_creation"].discontinued);
            expect(this.FormPage.getDiscontinuedDateInput().getAttribute('value')).toBe(computerData["correct_creation"].discontinued)
        });

        it("And I select a company", function () {
            this.FormPage.setCompany(computerData["correct_creation"].company);
            expect(this.FormPage.getCompanyInput().$('option:checked').getText()).toBe(computerData["correct_creation"].company)
        });

        it("And I do not input a name on the name field", function () {
        });

        it("When I click on \"Create this computer\" button", function () {
            this.FormPage.save();
        });

        it("Then I should stay on the Add Page section", function () {
            expect(this.ResultsTable.getTableElement().isPresent()).toBe(false);
        });

    });

    describe('Scenario: Try to add a Computer with long name', function() {

        it("Given I navigate to Computers List homepage", function () {
            this.NavigationHelper.goToHomePage();                
            expect(browser.isElementPresent(this.HomePage.getComputersTable())).toBe(true);
        });

        it("And I click on \"Add a new computer\" button", function () {
            self = this;
            this.HomePage.clickAddButton().then(function(){
                let title = self.FormPage.getTitleElement();
                self.NavigationHelper.waitForElement(title, 'Add page title not present. Are you on the correct page?');
                expect(title.isPresent()).toBe(true);
            });
        });

        it("And I input a very long name on the name field", function () {
            this.FormPage.setName(computerData["very_long_name"].name);
            expect(this.FormPage.getNameInput().getAttribute('value')).toBe(computerData["very_long_name"].name);
        });

        it("And I input a date on the introduced date field", function () {
            this.FormPage.setIntroducedDate(computerData["correct_creation"].introduced)
            expect(this.FormPage.getIntroducedDateInput().getAttribute('value')).toBe(computerData["correct_creation"].introduced);
        });

        it("And I input a date on the discontinued date field", function () {
            this.FormPage.setDiscontinuedDate(computerData["correct_creation"].discontinued);
            expect(this.FormPage.getDiscontinuedDateInput().getAttribute('value')).toBe(computerData["correct_creation"].discontinued)
        });

        it("And I select a company", function () {
            this.FormPage.setCompany(computerData["correct_creation"].company);
            expect(this.FormPage.getCompanyInput().$('option:checked').getText()).toBe(computerData["correct_creation"].company)
        });

        it("When I click on \"Create this computer\" button", function () {
            this.FormPage.save();
        });

        it("Then I should be redirected to the home page", function () {
            expect(this.HomePage.getTitleElement().isPresent()).toBeTruthy();
        });

        it("And I should see an alert message notifying that the computer was created correctly", function () {
            var alertMessageText = this.PageObjectHelper.getElementText(this.HomePage.getAlertMessage());
            expect(alertMessageText).toContain(computerData["very_long_name"].name);        
        });

    });

    describe('Scenario: Try to add a Computer with special characters on its name', function() {

        it("Given I navigate to Computers List homepage", function () {
            this.NavigationHelper.goToHomePage();                
            expect(browser.isElementPresent(this.HomePage.getComputersTable())).toBe(true);
        });

        it("And I click on \"Add a new computer\" button", function () {
            self = this;
            this.HomePage.clickAddButton().then(function(){
                let title = self.FormPage.getTitleElement();
                self.NavigationHelper.waitForElement(title, 'Add page title not present. Are you on the correct page?');
                expect(title.isPresent()).toBe(true);
            });
        });

        it("And I input a name with special characters on the name field", function () {
            this.FormPage.setName(computerData["name_with_special_chars"].name);
            expect(this.FormPage.getNameInput().getAttribute('value')).toBe(computerData["name_with_special_chars"].name);
        });

        it("And I input a date on the introduced date field", function () {
            this.FormPage.setIntroducedDate(computerData["correct_creation"].introduced)
            expect(this.FormPage.getIntroducedDateInput().getAttribute('value')).toBe(computerData["correct_creation"].introduced);
        });

        it("And I input a date on the discontinued date field", function () {
            this.FormPage.setDiscontinuedDate(computerData["correct_creation"].discontinued);
            expect(this.FormPage.getDiscontinuedDateInput().getAttribute('value')).toBe(computerData["correct_creation"].discontinued)
        });

        it("And I select a company", function () {
            this.FormPage.setCompany(computerData["correct_creation"].company);
        });

        it("When I click on \"Create this computer\" button", function () {
            this.FormPage.save();
        });

        it("Then I should be redirected to the home page", function () {
            expect(this.HomePage.getTitleElement().isPresent()).toBeTruthy();
        });

        it("And I should see an alert message notifying that the computer was created correctly", function () {
            var alertMessageText = this.PageObjectHelper.getElementText(this.HomePage.getAlertMessage());
            expect(alertMessageText).toContain(computerData["name_with_special_chars"].name);        
        });

    });

    describe('Scenario: Try to add a Computer with invalid date format', function() {


        it("Given I navigate to Computers List homepage", function () {
            this.NavigationHelper.goToHomePage();                
            expect(browser.isElementPresent(this.HomePage.getComputersTable())).toBe(true);
        });

        it("And I click on \"Add a new computer\" button", function () {
            self = this;
            this.HomePage.clickAddButton().then(function(){
                let title = self.FormPage.getTitleElement();
                self.NavigationHelper.waitForElement(title, 'Add page title not present. Are you on the correct page?');
                expect(title.isPresent()).toBe(true);
            });
        });

        it("And I input a date on the introduced date field", function () {
            this.FormPage.setIntroducedDate(computerData["correct_creation"].introduced)
            expect(this.FormPage.getIntroducedDateInput().getAttribute('value')).toBe(computerData["correct_creation"].introduced);
        });

        it("And I input a date on the discontinued date field", function () {
            this.FormPage.setDiscontinuedDate(computerData["invalid_date_format"].discontinued);
            expect(this.FormPage.getDiscontinuedDateInput().getAttribute('value')).toBe(computerData["invalid_date_format"].discontinued)
        });

        it("And I select a company", function () {
            this.FormPage.setCompany(computerData["correct_creation"].company);
        });

        it("And I do not input a name on the name field", function () {
        });

        it("When I click on \"Create this computer\" button", function () {
            this.FormPage.save();
        });

        it("Then I should stay on the Add Page section", function () {
            expect(this.ResultsTable.getTableElement().isPresent()).toBe(false);
        });

    });



});
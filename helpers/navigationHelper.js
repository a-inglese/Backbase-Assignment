var 
    homePage = require('../page_object/homePage'),
    formPage = require('../page_object/formPage')
    pageObjectHelper = require('../helpers/pageObjectHelper')

function NavigationHelper () {
  this.HomePage = new homePage();
  this.FormPage = new formPage();
  this.PageObjectHelper = new pageObjectHelper();
}
  
  NavigationHelper.prototype.waitForElement = function(element,errorMessage) {
    let until = protractor.ExpectedConditions;
    browser.wait(until.presenceOf(element), 30000, errorMessage);
  };

  NavigationHelper.prototype.waitForTextInElement = function(element,textToCheck,errorMessage) {
    let until = protractor.ExpectedConditions;
    browser.wait(until.textToBePresentInElement(element, textToCheck), 80000, errorMessage);
  }

  NavigationHelper.prototype.goToHomePage = function(){
    var self = this;
    browser.get(this.HomePage.getUrl()).then(function(){
      var EC = protractor.ExpectedConditions;
      browser.wait(EC.textToBePresentInElement(self.HomePage.getTitleElement(), self.HomePage.getTitle()), 5000);
    });
  }

  NavigationHelper.prototype.createComputer = function(computer){
    this.HomePage.clickAddButton();
    this.FormPage.setName(computer.name);
    this.FormPage.setIntroducedDate(computer.introduced);
    this.FormPage.setDiscontinuedDate(computer.discontinued);
    this.FormPage.setCompany(computer.company);
    this.FormPage.save();
  }

  NavigationHelper.prototype.deleteComputer = function(computer){
    this.ResultsTable.selectComputer(computer);
    this.FormPage.delete();
  }
  
module.exports = NavigationHelper;
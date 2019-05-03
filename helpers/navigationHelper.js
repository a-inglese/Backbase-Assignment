var 
    homePage = require('../page_object/homePage'),
    addPage = require('../page_object/addPage')
    pageObjectHelper = require('../helpers/pageObjectHelper')

function NavigationHelper () {
  this.HomePage = new homePage();
  this.AddPage = new addPage();
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
    this.AddPage.setName(computer.name);
    this.AddPage.setIntroducedDate(computer.introduced);
    this.AddPage.setDiscontinuedDate(computer.discontinued);
    this.AddPage.setCompany(computer.company);
    this.AddPage.save();
  }

  NavigationHelper.prototype.deleteComputer = function(computer){
    this.ResultsTable.selectComputer(computer);
    this.EditPage.delete();
  }
  
module.exports = NavigationHelper;
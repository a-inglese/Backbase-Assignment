function AddPage () {
    this.title = 'Add a computer';

    this.titleLocator = element(by.id('main')).$('h1');
    this.nameInput = element(by.id('name'));
    this.introducedDateInput = element(by.id('introduced'))
    this.discontinuedDateInput = element(by.id('discontinued'));
    this.companyInput = element(by.id('company'));
    this.saveButton = $('.btn.primary');
    this.cancelButton = element(by.linkText('Cancel'));
    this.deleteButton = $('.btn.danger');
  
  
    // GETTERS //
  
  
    AddPage.prototype.getTitle = function(){
      return this.title;
    };

    AddPage.prototype.getTitleElement = function(){
      return this.titleLocator;
    };
  
    AddPage.prototype.getNameInput = function(){
      return this.nameInput;
    };
  
    AddPage.prototype.getIntroducedDateInput = function(){
      return this.introducedDateInput;
    };
  
    AddPage.prototype.getDiscontinuedDateInput = function(){
      return this.discontinuedDateInput;
    };
  
    AddPage.prototype.getCompanyInput = function(){
      return this.companyInput;
    };
  
    AddPage.prototype.getSaveButton = function(){
      return this.saveButton;
    };
  
    AddPage.prototype.getCancelButton = function(){
      return this.cancelButton;
    };
  
    AddPage.prototype.getDeleteButton = function(){
      return this.deleteButton;
    };
  
    // SETTERS //
  
    AddPage.prototype.setName = function(name) {
      this.getNameInput().sendKeys(name);
    };
  
    AddPage.prototype.setIntroducedDate = function(introducedDate) {
      this.getIntroducedDateInput().sendKeys(introducedDate);
    };
  
    AddPage.prototype.setDiscontinuedDate = function(discontinuedDate) {
      this.getDiscontinuedDateInput().sendKeys(discontinuedDate);
    };
  
    AddPage.prototype.setCompany = function(company) {
      element(by.cssContainingText('option', company)).click();
    };
  
    AddPage.prototype.save = function() {
      this.getSaveButton().click();
    };
  
    AddPage.prototype.cancel = function() {
      this.getCancelButton().click();
    };
  
    AddPage.prototype.delete = function() {
      this.getDeleteButton().click();
    };
  
  }
  
  module.exports = AddPage;
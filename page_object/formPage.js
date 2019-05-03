function FormPage () {
    this.titleAdd = 'Add a computer';
    this.titleEdit = 'Edit computer';
  
    this.titleLocator = element(by.id('main')).$('h1');
    this.nameInput = element(by.id('name'));
    this.introducedDateInput = element(by.id('introduced'))
    this.discontinuedDateInput = element(by.id('discontinued'));
    this.companyInput = element(by.id('company'));
    this.saveButton = $('.btn.primary');
    this.cancelButton = element(by.linkText('Cancel'));
    this.deleteButton = $('.btn.danger');
  
  
    // GETTERS //
  
    FormPage.prototype.getTitleElement = function(){
      return this.titleLocator;
    };

    FormPage.prototype.getTitleAdd = function(){
      return this.titleAdd;
    };

    FormPage.prototype.getTitleEdit = function(){
      return this.titleEdit;
    };
  
    FormPage.prototype.getNameInput = function(){
      return this.nameInput;
    };
  
    FormPage.prototype.getIntroducedDateInput = function(){
      return this.introducedDateInput;
    };
  
    FormPage.prototype.getDiscontinuedDateInput = function(){
      return this.discontinuedDateInput;
    };
  
    FormPage.prototype.getCompanyInput = function(){
      return this.companyInput;
    };
  
    FormPage.prototype.getSaveButton = function(){
      return this.saveButton;
    };
  
    FormPage.prototype.getCancelButton = function(){
      return this.cancelButton;
    };
  
    FormPage.prototype.getDeleteButton = function(){
      return this.deleteButton;
    };
  
    // SETTERS //
  
    FormPage.prototype.setName = function(name) {
      this.getNameInput().sendKeys(name);
    };
  
    FormPage.prototype.setIntroducedDate = function(introducedDate) {
      this.getIntroducedDateInput().sendKeys(introducedDate);
    };
  
    FormPage.prototype.setDiscontinuedDate = function(discontinuedDate) {
      this.getDiscontinuedDateInput().sendKeys(discontinuedDate);
    };
  
    FormPage.prototype.setCompany = function(company) {
      element(by.cssContainingText('option', company)).click();
    };
  
    FormPage.prototype.save = function() {
      this.getSaveButton().click();
    };
  
    FormPage.prototype.cancel = function() {
      this.getCancelButton().click();
    };
  
    FormPage.prototype.delete = function() {
      this.getDeleteButton().click();
    };
  
  }
  
  module.exports = FormPage;
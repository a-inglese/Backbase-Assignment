function EditPage () {
    this.title = 'Edit computer';
  
    this.nameInput = element(by.id('name'));
    this.introducedDateInput = element(by.id('introduced'))
    this.discontinuedDateInput = element(by.id('discontinued'));
    this.companyInput = element(by.id('company'));
    this.saveButton = element(by.class('btn primary'));;
    this.cancelButton = element(by.linkText('Cancel'));
    this.deleteButton = element(by.class('btn danger'));
  
  
    // GETTERS //
  
  
    EditPage.prototype.getTitle = function(){
      return this.title;
    };
  
    EditPage.prototype.getNameInput = function(){
        return this.nameInput;
    };
  
    EditPage.prototype.getIntroducedDateInput = function(){
        return this.introducedDateInput;
    };
  
    EditPage.prototype.getDiscontinuedDateInput = function(){
        return this.discontinuedDateInput;
    };
  
    EditPage.prototype.getCompanyInput = function(){
        return this.companyInput;
    };
  
    EditPage.prototype.getSaveButton = function(){
      return this.saveButton;
    };
  
    EditPage.prototype.getCancelButton = function(){
      return this.cancelButton;
    };
  
    EditPage.prototype.getDeleteButton = function(){
      return this.deleteButton;
    };
  
    // SETTERS //
  
    EditPage.prototype.setName = function(name) {
      this.getNameInput().sendKeys(name);
    };
  
    EditPage.prototype.setIntroducedDate = function(introducedDate) {
      this.getIntroducedDateInput().sendKeys(introducedDate);
    };
  
    EditPage.prototype.setDiscontinuedDate = function(discontinuedDate) {
      this.getDiscontinuedDateInput().sendKeys(discontinuedDate);
    };
  
    EditPage.prototype.setCompany = function(company) {
      this.getCompanyInput().sendKeys(company);
    };
  
    EditPage.prototype.save = function() {
      this.getSaveButton().click();
    };
  
    EditPage.prototype.cancel = function() {
      this.getCancelButton().click();
    };
  
    EditPage.prototype.delete = function() {
      this.getDeleteButton().click();
    };
  
  }
  
  module.exports = EditPage;
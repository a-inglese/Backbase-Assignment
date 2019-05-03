
function HomePage () {
    this.url = 'http://computer-database.herokuapp.com/computers';
    this.title = 'computers found';

    this.computersFound = element(by.id('main')).$('h1');
    this.searchBox = element(by.id('searchbox'));
    this.searchButton = element(by.id('searchsubmit'));
    this.addComputerButton = element(by.id('add'));
    this.alertMessage = $('.alert-message.warning');
    this.computersTable = $('.computers.zebra-striped')

  
    // GETTERS //
  
    HomePage.prototype.getUrl = function(){
        return this.url;
    };

    HomePage.prototype.getTitle = function(){
        return this.title;
    };

    HomePage.prototype.getNumberOfComputersFound = function(){
        return this.computersFound.getText().then(function(text){
            let number = parseInt(text.split(" ")[0]);
            return number;
        });
    };

    HomePage.prototype.getTitleElement = function(){
        return this.computersFound;
    };

    HomePage.prototype.getComputersTable = function (){
        return this.computersTable;
    }

    HomePage.prototype.getAlertMessage = function(){
        return this.alertMessage;
    }

    HomePage.prototype.clickSearchBox = function(){
        return this.searchBox.click();
    };

    HomePage.prototype.clickSearchButton = function(){
        return this.searchButton.click();
    };

    HomePage.prototype.searchForComputer = function(computerName){
        this.clickSearchBox();
        this.enterTextOnSearchBox(computerName);
        this.clickSearchButton();
    };

    HomePage.prototype.enterTextOnSearchBox = function(text){
        this.searchBox.sendKeys(text);
    }

    HomePage.prototype.clickAddButton = function(){
        return this.addComputerButton.click();
    };
  
  }
  
  module.exports = HomePage;
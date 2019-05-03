
function ResultsTable () {
    this.table = $('.computers.zebra-striped');
  
    // GETTERS //
  
    ResultsTable.prototype.getTableElement = function(){
        return this.table;
    };

    ResultsTable.prototype.getResultsQuantity = function (){
        return $('.computers.zebra-striped tbody').$$('tr').count().then(function(quantity){
            return quantity
          })
    };

    ResultsTable.prototype.selectComputerFromSearch = function (computerName){
        return $$('.computers.zebra-striped tbody').$$('tr').get(0).$('a').click()
    };

  
  }
  
  module.exports = ResultsTable;
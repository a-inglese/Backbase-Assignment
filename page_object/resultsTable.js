
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

    ResultsTable.prototype.selectComputer = function (computerName){
        return $$('.computers.zebra-striped tr').filter(function(row) {
            // Get the first column's text.
            return row.$$('td').get(1).getText().then(function(rowName) {
              // Filter rows matching the computer name
              console.log(rowName)
              return rowName === computerName;
            });
          }).then(function(rows) {
            // This is an array. Find the button in the row and click on it.
            rows[0].$('a').click();
          });
    };

    ResultsTable.prototype.selectComputer = function(computer){};


  
  }
  
  module.exports = ResultsTable;
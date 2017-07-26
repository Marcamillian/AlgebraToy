AlgebraObjects = require('./AlgebraObjects.js');
AlgebraObjectDisplay = require('./AlgebraObjectDisplay.js')
AppManager = require('./AppManager.js').AppManager;

// create a term
var term1 = AlgebraObjects.AlgebraTerm({ factor: 1, variables:{x:{power:1}} } )
var term2 = AlgebraObjects.AlgebraTerm({ factor: 2, variables:{y:{power:1}} } )
var term3 = AlgebraObjects.AlgebraTerm({ factor: 6, variables:{y:{power:1}} } )

// create the initial statements
var LHS  = AlgebraObjects.AlgebraStatement([term1], undefined, "LHS")
var RHS = AlgebraObjects.AlgebraStatement([term2, term3], undefined, "RHS")

// create the AppManager
var appManager = AppManager(LHS, RHS)

var clickFunction = function(term){
    appManager.termSelect(term);
    AlgebraObjectDisplay.clearStatements();
    AlgebraObjectDisplay.updateDisplay(appManager.getStatements(), clickFunction)
}

// display the inital state
window.onload = function(){
    AlgebraObjectDisplay.updateDisplay(appManager.getStatements(), clickFunction)
}







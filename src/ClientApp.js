AlgebraObjects = require('./AlgebraObjects.js');
AlgebraObjectDisplay = require('./AlgebraObjectDisplay.js')
AppManager = require('./AppManager.js').AppManager;
TermCreator = require('./TermCreator.js')

// create a term
var term1 = AlgebraObjects.AlgebraTerm({ factor: 1, variables:{x:{power:1}} } )
var term2 = AlgebraObjects.AlgebraTerm({ factor: 2, variables:{y:{power:1}} } )
var term3 = AlgebraObjects.AlgebraTerm({ factor: 6, variables:{y:{power:1}} } )

// create the initial statements
var LHS  = AlgebraObjects.AlgebraStatement([term1], undefined, "LHS")
var RHS = AlgebraObjects.AlgebraStatement([term2, term3], undefined, "RHS")

// create the AppManager
var appManager = AppManager(LHS, RHS)

// make the term creator
var termCreator = TermCreator();

var updateDisplay = function updateDisplay(){
    AlgebraObjectDisplay.clearStatements();
    AlgebraObjectDisplay.updateDisplay(appManager.getStatements(), termClickFunction)
}

var termClickFunction = function(term){
    appManager.termSelect(term);
    updateDisplay()
}

var updateTermCreatorDisplay = function(){
    let term = termCreator.getTerm()
    document.querySelector('#created-term').appendChild(AlgebraObjectDisplay.getHTML(term));
}

// display the inital state
window.onload = function(){
    AlgebraObjectDisplay.updateDisplay(appManager.getStatements(), termClickFunction)

    // add in the function to add the terms
    document.querySelector('.addTerm').addEventListener('click',()=>{
        let term = AlgebraObjects.AlgebraTerm({factor: 5, variables:{x:{power:1}} })
        appManager.introduceTerm(term)
        updateDisplay()
    })

    termCreator.setFactor(3)
    // update the termCreator
    updateTermCreatorDisplay()
}







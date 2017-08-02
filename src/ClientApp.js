AlgebraObjects = require('./AlgebraObjects.js');
AlgebraObjectDisplay = require('./AlgebraObjectDisplay.js')
AppManager = require('./AppManager.js').AppManager;
TermCreator = require('./TermCreator.js')


// TODO :: pull the equations from somewhere so that you can swap them in and out
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
    let element = document.querySelector('#created-term');
    while(element.hasChildNodes()){
        element.removeChild(element.lastChild)
    }
    element.appendChild(AlgebraObjectDisplay.getHTML(term, ()=>{})); // add the new child
}

// display the inital state
window.onload = function(){
    AlgebraObjectDisplay.updateDisplay(appManager.getStatements(), termClickFunction)

    // add in the function to add the terms
    document.querySelector('.addTerm').addEventListener('click',()=>{
        let term = termCreator.getTerm()
        appManager.introduceTerm(term)
        updateDisplay()
    })

    termCreator.setFactor(3)
    // update the termCreator

    updateTermCreatorDisplay()

    // add the control listeners
    document.querySelector('#factor-up').addEventListener('click',()=>{termCreator.increaseFactor(); updateTermCreatorDisplay()})
    document.querySelector('#factor-down').addEventListener('click',()=>{ termCreator.decreaseFactor(); updateTermCreatorDisplay() })
    document.querySelector('#next-var').addEventListener('click',()=>{ termCreator.nextVariable(); updateTermCreatorDisplay() })
    document.querySelector('#power-up').addEventListener('click',()=>{ termCreator.increasePower(); updateTermCreatorDisplay() })
    document.querySelector('#power-down').addEventListener('click',()=>{ termCreator.decreasePower(); updateTermCreatorDisplay() })


}







AlgebraObjects = require('./AlgebraObjects.js');
AlgebraObjectDisplay = require('./AlgebraObjectDisplay.js')
AppManager = require('./AppManager.js').AppManager;
TermCreator = require('./TermCreator.js')
EquationLoader = require('./EquationLoader.js')
EquationObject = require('./EquationSetups.json')

var equationLoader = EquationLoader(EquationObject);

// load in the equation from the loader
var startEquation = equationLoader.getNextEquation();

// create the AppManager
var appManager = AppManager(startEquation.LHS, startEquation.RHS)

// make the term creator
var termCreator = TermCreator();

// update the equation display
var updateDisplay = function updateDisplay(){
    AlgebraObjectDisplay.clearStatements();
    AlgebraObjectDisplay.updateDisplay(appManager.getStatements(), termClickFunction)
}

// what happens when a term in an equation is clicked
var termClickFunction = function(term){
    appManager.termSelect(term);
    updateDisplay()
}


// update the display of the proposed term to be added
var updateTermCreatorDisplay = function(){
    let term = termCreator.getTerm()
    let element = document.querySelector('#created-term');
    while(element.hasChildNodes()){
        element.removeChild(element.lastChild)
    }
    element.appendChild(AlgebraObjectDisplay.getHTML(term, ()=>{})); // add the new child
}

var loadEquation = function loadEquation(){
    let newEquation = equationLoader.getNextEquation()
    appManager = AppManager(newEquation.LHS, newEquation.RHS);
    updateDisplay()
}

// set up the initial display
window.onload = function(){
    AlgebraObjectDisplay.updateDisplay(appManager.getStatements(), termClickFunction)

    // add in the function to add the terms
    document.querySelector('.add-term').addEventListener('click',()=>{
        let term = termCreator.getTerm()
        appManager.introduceTerm('add',term)
        updateDisplay()
    })

    document.querySelector('.multiply-by-term').addEventListener('click', ()=>{
        let term = termCreator.getTerm()
        appManager.introduceTerm('multiply', term);
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

    // click operation to load another equation
    document.querySelector('#load-eqn').addEventListener('click', ()=>{loadEquation()})
}







test = require('tape');

var TermCreator = require("../src/TermCreator.js")
var AlgebraTerm = require("../src/AlgebraObjects.js").AlgebraTerm;
var Operations = require("../src/AlgebraObjects.js").TermOperators;


test("Making some basic objects", (t)=>{
    t.ok(true)
    
    let termCreator = TermCreator();

    let thisTerm = termCreator.getTerm();
    let thisTermVars = thisTerm.getVariables();
    t.equals(thisTerm.getFactor(), 1, "Initial created term is 1")
    t.equals(Object.keys(thisTermVars).length,0, "No variables")
    
    termCreator.setFactor(5);
    thisTerm = termCreator.getTerm();
    t.equals(thisTerm.getFactor(),5, "Factor of the term is now 5")

    termCreator.setVariable('x', 2);
    thisTerm = termCreator.getTerm();
    thisTermVars = thisTerm.getVariables();
    t.equals(Object.keys(thisTermVars).length, 1, "Has a single variable")
    t.ok(thisTermVars['x'], "variable is x")
    t.equals(thisTermVars['x'].power, 2, "Power of x is 2")

    t.end()

    
})

test("Testing Increase and decrease", (t)=>{
    t.ok(true)
    
    let termCreator = TermCreator();

    let thisTerm = termCreator.getTerm();
    let thisTermVars = thisTerm.getVariables();
    t.equals(thisTerm.getFactor(), 1, "Initial created term is 1")
    t.equals(Object.keys(thisTermVars).length,0, "No variables")
    
    termCreator.increaseFactor();
    t.equals(termCreator.getTerm().getFactor(), 2)

    termCreator.decreaseFactor();
    t.equals(termCreator.getTerm().getFactor(), 1)

    // changing the variables

    termCreator.nextVariable();
    thisTermVars = termCreator.getTerm().getVariables();
    t.equals(Object.keys(thisTermVars).length, 1, "Only 1 variable")
    t.equals(Object.keys(thisTermVars)[0], 'x', "Variable now added - first in the variables array")

    termCreator.nextVariable();
    thisTermVars = termCreator.getTerm().getVariables();
    t.equals(Object.keys(thisTermVars).length, 1, "Only 1 variable")
    t.equals(Object.keys(thisTermVars)[0], 'y', "Variable now changed - second in the variables array")

    termCreator.nextVariable();
    thisTermVars = termCreator.getTerm().getVariables();
    t.equals(Object.keys(thisTermVars).length, 1, "Only 1 variable")
    t.equals(Object.keys(thisTermVars)[0], 'z', "Variable now changed - third in the variables array")

    termCreator.nextVariable();
    thisTermVars = termCreator.getTerm().getVariables();
    t.equals(Object.keys(thisTermVars).length, 0, "Rolled round - all variables removed")



    t.end()
    
})

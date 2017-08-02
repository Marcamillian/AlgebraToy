var AlgebraTerm = require('./AlgebraObjects.js').AlgebraTerm;
var duplicateTerm = require('./AlgebraObjects.js').TermOperators.duplicateTerm;

const TermCreator = function TermCreator(){
    var state = {
        createdTerm: AlgebraTerm()
    }
    const variables = ['x','y','z']

    const setFactor = function setFactor(factor){
        state.createdTerm.setFactor(factor)
    }
    
    const setVariable = function setVariable(variable, power){
        state.createdTerm.addVariable(variable, power)
    }

    const getTerm = function getTerm(){
        return duplicateTerm(state.createdTerm)
    }

    const increaseFactor = function increaseFactor(){
        let newFactor = state.createdTerm.getFactor() + 1;
        state.createdTerm.setFactor(newFactor)
    }

    const decreaseFactor = function decreaseFactor(){
        let newFactor = state.createdTerm.getFactor() - 1;
        state.createdTerm.setFactor(newFactor)
    }

    const nextVariable = function toggleVariable(){
        let currentVars = state.createdTerm.getVariables();
        let varKeys = Object.keys(currentVars)
        if(varKeys.length){ // if there is a variable
            let nextVarIndex = variables.indexOf(varKeys[0]) +1; // get the index of the next variable
            state.createdTerm.removeVariable(varKeys[0]); // remove the last variable
            if(nextVarIndex < variables.length){    // if there are still variables to assign
                state.createdTerm.addVariable(variables[nextVarIndex],1)    // assign new variable
            }
        }else{  // if there is no current variable
            state.createdTerm.addVariable(variables[0],1) // set to the first variable
        }
    }

    const increasePower = function increasePower(){
        let variables = state.createdTerm.getVariables()
        
        // if there is a variable
        // if there is not a variable

    }

    const decreasePower = function decreasePower(){
        
    }

    return {
        setFactor: setFactor,
        setVariable: setVariable,
        getTerm: getTerm,
        increaseFactor: increaseFactor,
        decreaseFactor: decreaseFactor,
        nextVariable: nextVariable
    }
    
}

module.exports = TermCreator
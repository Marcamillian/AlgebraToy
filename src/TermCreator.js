var AlgebraTerm = require('./AlgebraObjects.js').AlgebraTerm;
var duplicateTerm = require('./AlgebraObjects.js').TermOperators.duplicateTerm;

const TermCreator = function TermCreator(){
    var state = {
        createdTerm: AlgebraTerm()
    }

    const setFactor = function setFactor(factor){
        state.createdTerm.setFactor(factor)
    }
    
    const setVariable = function setVariable(variable, power){
        state.createdTerm.addVariable(variable, power)
    }

    const getTerm = function getTerm(){
        return duplicateTerm(state.createdTerm)
    }

    return {
        setFactor: setFactor,
        setVariable: setVariable,
        getTerm: getTerm
    }
    
}

module.exports = {TermCreator: TermCreator};
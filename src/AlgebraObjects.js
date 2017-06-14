const AlgebraTerm = function AlgebraTerm(_arguments){
    var state = {
        factor: 1,
        variables: {}
    }
    const init = function init(termValues){
        state.factor = (termValues != undefined && termValues.factor != undefined) ? termValues.factor:  1;

        if (termValues != undefined && termValues.variables){
            Object.keys(termValues.variables).forEach(function(variableName){
                state.variables[variableName] = {power: (termValues.variables[variableName].power == undefined)? 1 // account fot the fact that power might not have been stated
                                                            : termValues.variables[variableName].power };
            })
        }
    }
    const getState = function getState(){
        return Object.assign(state)
    }
    const getFactor = function getFactor(){
        return state.factor
    }
    const getVariables = function getVariables(){
        return Object.assign(state.variables)
    }
    // make the state
    init(_arguments);

    return Object.assign(
        {getVariables: getVariables,
        getFactor: getFactor,
        getState: getState}
    )
}

const AlgebraStatement = function AlgebraStatement(terms){ // terms == array of terms (should this be an object?)
    var statementContainer = {};

    statementContainer.terms = terms//.slice(0) //TODO: working on compare function so it doesn't have to be the same object
    statementContainer.factor = 1
    
    const getFactor = function getFactor(){
        return statementContainer.factor();
    }

    const hasTerm = function hasTerm(searchTerm){

        statementContainer.terms.forEach(function(term){
            console.log(term.getState())
            if (searchTerm.getFactor() == term.getFactor()){ return true}
        })
        return false
    }

    return Object.assign(
        {getFactor: getFactor, 
         hasTerm: hasTerm}
    )
}

const TermOperators = {
    add: function TermAdd(term1, term2){
        // check that the variables are compatable
        var firstVars = term1.getVariables()
        var secondVars = term2.getVariables()

        var firstKeys = Object.keys(firstVars)
        var secondKeys = Object.keys(secondVars)

        // Can't add them if they are not the same factor - throw an error 
        firstKeys.forEach(function(key,index){

            if(secondKeys.includes(key) == false // if they do not have the same variable
                || firstVars[key].power != secondVars[key].power){    // the the variable does not have the same power
                    throw new Error("Variables don't match")
            } 
        })

        // we can add to add the factors
        newFactor = term1.getFactor() + term2.getFactor();
        if(newFactor == 0){ throw new Error("Terms cancelled each other")}

        return AlgebraTerm({factor: newFactor, variables: term1.getVariables()});
    },
    multiply: function multiply(term1, term2){
        // work out the factor

        let newFactor = term1.getFactor() * term2.getFactor();
        let newVariables = {}

        let firstVars = term1.getVariables()
        let firstKeys = Object.keys(firstVars);
        let secondVars = term2.getVariables();
        let secondKeys = Object.keys(secondVars)

        // could this be done with a reuce?
        firstKeys.forEach((variable)=>{ // add all the 
            newVariables[variable] = {power: firstVars[variable].power}
        })

        // second vars
        secondKeys.forEach((variable)=>{
            if(firstKeys.includes(variable)){ // if the variable already exists on the object
                newVariables[variable].power += secondVars[variable].power
            }else{
                newVariables[variable] = {power:secondVars[variable].power}
            }
        })

        // combine all of the factors together (including the powers)
        return AlgebraTerm({factor: newFactor, variables: newVariables})
    },
    divide: function divide(term1, term2){ // term1 - numerator -- term2 denominator

        var term1Vars = term1.getVariables();
        var term1Keys = Object.keys(term1Vars)
        var term2Vars = term2.getVariables();
        var term2Keys = Object.keys(term2Vars)

        var newFactor = term1.getFactor() / term2.getFactor();
        var newVariables = {}

        // check to see if we can divide the factors by eachother
        
        if(newFactor % 1 != 0){throw new Error("factor not whole number")}

        // check to see if we can divide the variables by eachother
        term1Keys.forEach((variable)=>{
            newVariables[variable] = term1Vars[variable].power
        })

        term2Keys.forEach( (variable)=>{ // if the second term doesn't exist on the first - throw an error
            if(term1Keys.includes(variable)){
                var newPower = term1Vars[variable].power - term2Vars[variable].power
                if( newPower != 0){ newVariables[variable].power = newPower
                }else{
                    delete newVariables[variable]
                }
            }else{ 
                throw new Error("variables not compatible")
            }
        })

        return AlgebraTerm({factor: newFactor,
                            variables: newVariables})
        
    },
    sameFactor: function sameFactor(term1, term2){
        return term1.getFactor() == term2.getFactor()
    },
    sameVariables: function sameVariable(term1, term2){
        var termVariables = Object.keys(term1.getVariables());
        var match = true;

        termVariables.forEach((variable)=>{
            if(term2.getVariables()[variable] == undefined ){match = false; return false}// check the variable is there
            if(term1.getVariables()[variable].power != term2.getVariables()[variable].power){match = false; return false}// check its power is the same
        })

        return match
    }

}

module.exports = {
    AlgebraTerm: AlgebraTerm,
    AlgebraStatement: AlgebraStatement,
    TermOperators: TermOperators
}
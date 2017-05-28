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
        // check to see if we can divide the factors by eachother
        // check to see if we can divide the variables by eachother
    }

}

module.exports = {
    AlgebraTerm: AlgebraTerm,
    TermOperators: TermOperators
}
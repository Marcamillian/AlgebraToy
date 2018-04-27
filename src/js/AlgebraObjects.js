const AlgebraTerm = function AlgebraTerm(_arguments){
    var state = {
        factor: 1,
        variables: {},
        parent: {}
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
        return state.variables; 
    }
    const setParent = function addParent(statement){
        state.parent = statement;
    }
    const getParent = function getParent(){
        return state.parent
    }
    const clearParent = function clearParent(){
        return state.parent = undefined;
    }
    // make the state
    init(_arguments);

    return Object.assign(
        {getVariables: getVariables,
        getFactor: getFactor,
        getState: getState,
        setParent: setParent,
        getParent: getParent,
        clearParent: clearParent}
    )
}

const AlgebraStatement = function AlgebraStatement(terms, parent, name){ // terms == array of terms (should this be an object?)
    var state = {
        name: name,
        terms : terms, // an arrayof terms
        statements: [],
        parent : parent, // for checking outside
        multiTerm : AlgebraTerm({variable: 1})
    };
        
    state.terms.forEach(function(term){ // make sure all of the terms know who their parent are
        term.setParent(state)
    })


    const getParent = function getParent(){
        return state.parent
    }

    const setParent = function getParent(parentStatement){
        return state.parent = parentStatement
    }
    const clearParent = function clearParent(){
        return state.parent = undefined;
    }

    const getMultiplyTerm = function getFactor(){
        return state.multiTerm;
    }

    const setMultiplyTerm = function (multiplyTerm){
        multiplyTerm.setParent(state)
        return state.multiTerm = multiplyTerm;
    }

    const isMultiplyTerm = function isMultiplyTerm(checkTerm){
        return state.multiTerm == checkTerm;
    }

    const multiplyStatement = function(multiplyTerm){
        
        let multiTerm = undefined;
        state.multiTerm = TermOperators.multiply(multiTerm, multiplyTerm);
        multiTerm.setParent(state)
        return state.multiTerm
    }

    const includesTerm = function includesTerm(searchTerm){
        return (state.terms.includes(searchTerm)) ? state.terms.includes(searchTerm) : state.multiTerm == searchTerm
    }

    const addTerm = function addTerm(term){
        return state.terms.push(term)
    }
    const removeTerm = function removeTerm(term){
        if(includesTerm(term)){
            var index = terms.indexOf(term);
            state.terms[index].clearParent()
            state.terms.splice(index,1)
            return state.terms
        }else{
            return false;
        }
    }

    const getName = function getName(){
        return state.name;
    }

    //const getStatements = function getStatements(){
    //    return state.statements;
    //}

    const addStatement = function setStatement(addStatement){
        addStatement.setParent(state) // add the parent ref to the child
        state.statements.push(addStatement)
    }
    const removeStatement = function removeStatement(removeStatement){
        if(state.includesStatement(removeStatement)){
            var index = state.statements.indexOf(removeStatement);
            state.statements[index].clearParent();
            return state.statements.splice(index,1)
        }else{
            return false
        }
        
    }
    const includesStatement = function includesStatement(searchStatement){
        return state.statements.includes(searchStatement)
    }
    const isEmpty = function isEmpty(){
        return state.terms < 1
    }

    return Object.assign(state,
        {getMultiplyTerm: getMultiplyTerm,
         setMultiplyTerm: setMultiplyTerm,
         multiplyStatement: multiplyStatement,
         isMultiplyTerm: isMultiplyTerm,
         addTerm: addTerm,
         removeTerm: removeTerm,
         includesTerm: includesTerm,
         getName: getName,
         addStatement: addStatement,
         removeStatement: removeStatement,
         includesStatement: includesStatement,
         getParent: getParent,
         setParent: setParent,
         clearParent: clearParent,
         isEmpty: isEmpty
        }
    )
}

const TermOperators = {
    add: function TermAdd(term1, term2){
        // check that the variables are compatable
        var firstVars = term1.getVariables()
        var secondVars = term2.getVariables()

        var firstKeys = Object.keys(firstVars)
        var secondKeys = Object.keys(secondVars)

        let newFactor = undefined;

        // Can't add them if they are not the same factor - throw an error 
        firstKeys.forEach(function(key){

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
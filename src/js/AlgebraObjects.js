const AlgebraTerm = function AlgebraTerm(_arguments){
    var state = {
        factor: 1,
        variables: {},
        parent: {},
        isSelected: false
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

    const setSelected = function setSelected(selectSet){
        if(selectSet == undefined){
            state.isSelected != state.isSelected
        }else if(selectSet == true){ state.isSelected = true
        }else{ state.isSelected = false}
    }

    const setFactor = function setFactor(factor){
        state.factor = factor;
    }

    const addVariable = function addVariable(variable, power){
        state.variables[variable] = {'power': power}
    }

    const removeVariable = function removeVariable(variable){
        delete state.variables[variable]
    }

    const isSelected = function isSelected(){
        return state.isSelected
    }
    // make the state
    init(_arguments);

    return Object.assign(
        {getVariables: getVariables,
        getFactor: getFactor,
        getState: getState,
        setParent: setParent,
        getParent: getParent,
        clearParent: clearParent,
        setSelected: setSelected,
        isSelected: isSelected,
        setFactor: setFactor,
        addVariable: addVariable,
        removeVariable: removeVariable
        }
    )
}

const AlgebraStatement = function AlgebraStatement(terms, parent, name){ // terms == array of terms (should this be an object?)
    var statement = {
        name: name,
        terms : terms, // an arrayof terms
        statements: [],
        parent : parent, // for checking outside
        multiTerm : AlgebraTerm({variable: 1}), // never actually gets its parent set
        isSelected: false
    };
        
    statement.terms.forEach(function(term){ // make sure all of the terms know who their parent are
        term.setParent(statement)
    })
    statement.multiTerm.setParent(statement) // and the multiplyTerm

    const getMultiplyTerm = function getFactor(){
        return statement.multiTerm;
    }

    const getParent = function getParent(){
        return statement.parent
    }

    const setParent = function getParent(parentStatement){
        return statement.parent = parentStatement
    }
    const clearParent = function clearParent(){
        return statement.parent = undefined;
    }

    const setMultiplyTerm = function (multiplyTerm){
        multiplyTerm.setParent(statement)
        return statement.multiTerm = multiplyTerm;
    }

    const isMultiplyTerm = function isMultiplyTerm(checkTerm){
        return statement.multiTerm == checkTerm;
    }

    const multiplyStatement = function(multiplyTerm){
        statement.multiTerm = TermOperators.multiply(multiTerm, multiplyTerm);
        multiTerm.setParent(statement)
        return statement.multiTerm
    }

    const includesTerm = function includesTerm(searchTerm){
        return (statement.terms.includes(searchTerm)) ? statement.terms.includes(searchTerm) : statement.multiTerm == searchTerm
    }

    const addTerm = function addTerm(term){
        term.setParent(statement)
        return statement.terms.push(term)
    }
    const removeTerm = function removeTerm(term){
        if(includesTerm(term)){
            var index = terms.indexOf(term);
            statement.terms[index].clearParent()
            statement.terms.splice(index,1)
            return statement.terms
        }else{
            return false;
        }
    }

    const getTerms = function getTerms(){
        return statement.terms
    }

    const getName = function getName(){
        return statement.name;
    }

    const getStatements = function getStatements(){
        return statement.statements;
    }
    const addStatement = function addStatement(addStatement){
        addStatement.setParent(statement) // add the parent ref to the child
        statement.statements.push(addStatement)
    }
    const removeStatement = function removeStatement(removeStatement){
        if(statement.includesStatement(removeStatement)){
            var index = statement.statements.indexOf(removeStatement);
            statement.statements[index].clearParent();
            return statement.statements.splice(index,1)
        }else{
            return false
        }
        
    }
    const includesStatement = function includesStatement(searchStatement){
        return statement.statements.includes(searchStatement)
    }
    const isEmpty = function isEmpty(){
        return statement.terms < 1
    }

    const setSelected = function setSelected(selectSet){
        if(selectSet == undefined){
            return statement.isSelected != statement.isSelected
        }else if(selectSet == true){ return statement.isSelected = true
        }else{ return statement.isSelected = false }
    }

    const isSelectedStatement = function isSelectedStatement(){
        return statement.isSelected
    }

    return Object.assign(statement,
        {getMultiplyTerm: getMultiplyTerm,
         setMultiplyTerm: setMultiplyTerm,
         multiplyStatement: multiplyStatement,
         isMultiplyTerm: isMultiplyTerm,
         addTerm: addTerm,
         removeTerm: removeTerm,
         includesTerm: includesTerm,
         getTerms: getTerms,
         getName: getName,
         addStatement: addStatement,
         removeStatement: removeStatement,
         includesStatement: includesStatement,
         getStatements: getStatements,
         getParent: getParent,
         setParent: setParent,
         clearParent: clearParent,
         isEmpty: isEmpty,
         setSelected: setSelected,
         isSelectedStatement: isSelectedStatement
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
    },
    compareTerms: function compareTerms(term1, term2){
       return this.sameFactor(term1, term2) && this.sameVariables(term1, term2)
    },
    duplicateTerm: function duplicateTerm(term){
        let dupFactor = term.getFactor();
        let origVariables = term.getVariables();
        let dupVariables = {}

        Object.keys(origVariables).forEach((variable)=>{
            dupVariables[variable] = {power: origVariables[variable].power}
        })

        return AlgebraTerm({factor: dupFactor, variables: dupVariables})
    }

}

module.exports = {
    AlgebraTerm: AlgebraTerm,
    AlgebraStatement: AlgebraStatement,
    TermOperators: TermOperators
}
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const getHTML = function getHTML(algebraTerm, clickFunction){

    //add the contianer
    var termHTML = document.createElement('div');
    termHTML.classList.add("algebra-term")
    if(algebraTerm.isSelected()){termHTML.classList.add('selected')}
    
    //add the factor
    var factor = document.createElement('div');
    factor.classList.add("factor");
    factor.innerHTML = algebraTerm.getFactor().toString();

    //add the factor
    ////cycle through the vaiables
    var variables = algebraTerm.getVariables()
    var variablesHTML = document.createElement('div');
    Object.keys(variables).forEach(function(variable){

        // add the varibale symbol
        var variableHTML = document.createElement('div');
        variableHTML.classList.add("variable");
        variableHTML.innerHTML = variable
        
        // add the power to the varible symbol
        var power = document.createElement('div');
        power.classList.add("power")
        power.innerHTML = variables[variable].power.toString()

        if (variables[variable].power != 1){ variableHTML.appendChild(power) }

        variablesHTML.appendChild(variableHTML)
    })
    

    // assemble all of the components
    if(algebraTerm.getFactor() != 1){termHTML.appendChild(factor);}
    termHTML.appendChild(variablesHTML);

    // attach click functions
    termHTML.addEventListener('mouseup', function(){console.log(clickFunction(algebraTerm))})

    return termHTML
}

const getStatementHTML = function getStatementHTML(statement, clickFunction){

    // create the statement container
    var statementHTML = document.createElement('div');
    statementHTML.classList.add("statement")
    if(statement.isSelectedStatement()){statementHTML.classList.add('selected')}

    // create the multiply term
    var multiplyTermHTML = getHTML(statement.getMultiplyTerm(), clickFunction);
    multiplyTermHTML.classList.add("multiply-term")

    // create the bracket - if its not the outside term
    var bracketHTML = document.createElement('div')
    if(statement.getName() != 'LHS') {
        if(statement.getName() !='RHS'){
            bracketHTML.classList.add("bracket")
        }
    }

    // add in any sub statements
    statement.getStatements().forEach( (subStatement)=>{
        bracketHTML.appendChild(getStatementHTML(subStatement, clickFunction))
    })

    // create the inside Term HTML
    statement.getTerms().forEach((term)=>{
        bracketHTML.appendChild(getHTML(term, clickFunction))
    })

    // combine all of the HTML that we have
    statementHTML.appendChild(multiplyTermHTML)
    statementHTML.appendChild(bracketHTML)

    return statementHTML
}

const updateDisplay = function updateDisplay(statementArray, clickFunction){
    LHSHtml = AlgebraObjectDisplay.getStatementHTML(statementArray[0], clickFunction)
    RHSHtml = AlgebraObjectDisplay.getStatementHTML(statementArray[1], clickFunction)

    document.querySelector('#LHS').appendChild(LHSHtml);
    document.querySelector('#RHS').appendChild(RHSHtml);
}

const clearStatements = function clearStatements(){
    
    var LHS = document.querySelector('#LHS');
    var RHS = document.querySelector('#RHS');
    while(LHS.hasChildNodes()){
        LHS.removeChild(LHS.lastChild)
    }
    while(RHS.hasChildNodes()){
        RHS.removeChild(RHS.lastChild)
    }
}

module.exports = {
    getHTML:getHTML,
    getStatementHTML,
    updateDisplay: updateDisplay,
    clearStatements: clearStatements
}
},{}],2:[function(require,module,exports){
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
        isSelected: isSelected}
    )
}

const AlgebraStatement = function AlgebraStatement(terms, parent, name){ // terms == array of terms (should this be an object?)
    var statement = {
        name: name,
        terms : terms, // an arrayof terms
        statements: [],
        parent : parent, // for checking outside
        multiTerm : AlgebraTerm({variable: 1}),
        isSelected: false
    };
        
    statement.terms.forEach(function(term){ // make sure all of the terms know who their parent are
        term.setParent(statement)
    })

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
    }

}

module.exports = {
    AlgebraTerm: AlgebraTerm,
    AlgebraStatement: AlgebraStatement,
    TermOperators: TermOperators
}
},{}],3:[function(require,module,exports){
var Operations = require('./AlgebraObjects.js').TermOperators;
var AlgebraStatement = require('./AlgebraObjects.js').AlgebraStatement;


const AppManager = function AppManager(LHStatement, RHStatement){
    var state = {
        selectedTerm: undefined,
        statements: [
            AlgebraStatement([], undefined, 'LHS'),
            AlgebraStatement([], undefined, 'RHS'),
        ]
    }
    state.statements[0].addStatement(LHStatement)
    state.statements[1].addStatement(RHStatement)

    const termSelect = function termSelect(term){ // sets the term to be worked on 
        if(state.selectedTerm == undefined || state.selectedTerm == term){ // if there isn't already a selected term --- set the term and exit
            state.selectedTerm = term
            term.setSelected(true)
            term.getParent().setSelected(true)
            return "term set"
        }else{ // do an operation
            term.setSelected(false);
            state.selectedTerm.setSelected(false);
            state.selectedTerm.getParent().setSelected(false);
            term.getParent().setSelected(false);

            try{    // try to carry out the operation
                return operateOnTerm(getSelectedTerm(), term)
            }catch(err){    // catch anything that might happen
                console.error(err)
            }
        }
    }


    const operateOnTerm = function opertateOnTerm(term1, term2){
        var operation = undefined
        var result = undefined;

        if(sameStatement(term1, term2)){ // if they are in the same statement
            
            var multiplyTerm = getMultiplyTerm(term1, term2) // this is not picking up multiply

            if(multiplyTerm == undefined){ // -- ADD
                operation = "add";
                result = applyAddOperation(term1, term2)
                placeAddResult(result, term1)//TODO: implement these
                removeAddComponents(term1, term2)
                
            }else{  // -- MULTIPLY
                operation = "multiply"
                result = applyMultiplyOperation(term1, term2)
                placeMultiplyResult(result, (multiplyTerm != term1) ? term1 : term2 ) // give the one that isn't the multiplyTerm
                removeMultiplyComponents(multiplyTerm, (multiplyTerm != term1) ? term1 : term2 )
            }

        }else{
            operation = "not same statement"
        }

        state.selectedTerm = undefined;
        return {operation: operation , result: result}
    }

    const applyAddOperation = function applyAddOperation(term1, term2){
        return Operations.add(term1, term2)
    }
    const placeAddResult = function placeAddResult(result, placementTerm){
        var placeLocation = placementTerm.getParent()
        placeLocation.addTerm(result);     // add the result to the statement
        return true
    }
    const removeAddComponents = function removeAddComponents(term1, term2){
        var parentStatement = term1.getParent();
        parentStatement.removeTerm(term1);
        parentStatement.removeTerm(term2);
        return true
    }

    const applyMultiplyOperation = function applyMultiplyOperation(term1, term2){
        return Operations.multiply(term1, term2)
    }
    const placeMultiplyResult = function placeMultiplyResult(multiResult, placementTerm){
        var placeLocation = placementTerm.getParent().getParent()
        placeLocation.addTerm(multiResult) // add the multiplication result outside the bracket
        return true
    }
    const removeMultiplyComponents = function removeMultiplyComponents(multiplyTerm, term){ // TODO : work out the removal for nested statements
        var nestedStatement = term.getParent()
        nestedStatement.removeTerm(term)// remove the term we just multiplied
        if(nestedStatement.isEmpty()){ nestedStatement.getParent().removeStatement(nestedStatement) } // remove the statement if its empty

        return true
    }

    const getMultiplyTerm = function getMultiplyTerm(term1, term2){
        var parentStatement = term1.getParent()

        return (parentStatement.isMultiplyTerm(term1)) ? term1 :
                    (parentStatement.isMultiplyTerm(term2) ? term2 : undefined)
    }

    const addStatement = function addStatement(statement){
        state.statements.push(statement)
    }

    const sameStatement = function sameStatement(term1, term2){
        return term1.getParent() == term2.getParent()
    }
    const getSelectedTerm = function getSelectedTerm(){
        return state.selectedTerm
    }

    const getStatement = function getStatement(side){
        return (side == 'LHS') ? state.statements[0] : state.statements[1]
    }

    const getStatements = function getStatements(){
        return state.statements
    }

    return Object.create(
        { termSelect: termSelect,
            sameStatement:sameStatement,
            getSelectedTerm: getSelectedTerm,
            getStatement: getStatement,
            getStatements: getStatements
        }
    )
}

module.exports = {
    AppManager: AppManager
}

},{"./AlgebraObjects.js":2}],4:[function(require,module,exports){
AlgebraObjects = require('./AlgebraObjects.js');
AlgebraObjectDisplay = require('./AlgebraObjectDisplay.js')
AppManager = require('./AppManager.js').AppManager;

// create a term
var term1 = AlgebraObjects.AlgebraTerm({ factor: 1, variables:{x:{power:1}} } )
var term2 = AlgebraObjects.AlgebraTerm({ factor: 2, variables:{y:{power:1}} } )
var term3 = AlgebraObjects.AlgebraTerm({ factor: 6, variables:{y:{power:1}} } )

// create the initial statements
var LHS  = AlgebraObjects.AlgebraStatement([term1], undefined, "LHS")
var RHS = AlgebraObjects.AlgebraStatement([term2, term3], undefined, "RHS")

// create the AppManager
var appManager = AppManager(LHS, RHS)

var clickFunction = function(term){
    appManager.termSelect(term);
    AlgebraObjectDisplay.clearStatements();
    AlgebraObjectDisplay.updateDisplay(appManager.getStatements(), clickFunction)
}

// display the inital state
window.onload = function(){
    AlgebraObjectDisplay.updateDisplay(appManager.getStatements(), clickFunction)
}







},{"./AlgebraObjectDisplay.js":1,"./AlgebraObjects.js":2,"./AppManager.js":3}]},{},[4]);

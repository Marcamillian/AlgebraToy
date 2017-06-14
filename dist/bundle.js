(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


const getHTML = function getHTML(algebraTerm){

    //add the contianer
    var termHTML = document.createElement('div');
    termHTML.classList.add("algebra-term")
    
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
        variableHTML.innerHTML = "x"
        
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
    termHTML.addEventListener('mouseup', function(){
        AppManager.termSelect(algebraTerm)
    })

    return termHTML
}

module.exports = {
    getHTML:getHTML
}
},{}],2:[function(require,module,exports){
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

        return AlgebraTerm({factor: newFactor, variables: newVariables})
        
    }

}

module.exports = {
    AlgebraTerm: AlgebraTerm,
    TermOperators: TermOperators
}
},{}],3:[function(require,module,exports){
const AppManager = function AppManager(){
    var state = {
        operation: "add",
        selectedTerm: undefined
    }
    const termSelect = function termSelect(term){
        if(!state.selectedTerm){
            state.selectedTerm = term
        }else{
            console.log(AlgebraObjects.TermOperators.add(state.selectedTerm, term))
            state.selectedTerm = undefined;
        }
    }
    
    return Object.create(
        { termSelect: termSelect
        }
    )
}

module.exports = {
    AppManager: AppManager
}

},{}],4:[function(require,module,exports){
AlgebraObjects = require('./AlgebraObjects.js');
AlgebraObjectDisplay = require('./AlgebraObjectDisplay.js')
AppManager = require('./AppManager.js').AppManager();

// create a term
var term1 = AlgebraObjects.AlgebraTerm({ factor: 1, variables:{x:{power:1}} } )
var term2 = AlgebraObjects.AlgebraTerm({ factor: 2, variables:{x:{power:1}} } )
var term3 = AlgebraObjects.AlgebraTerm({ factor: 6, variables:{x:{power:1}} } )

//add the html to the document
document.body.appendChild(AlgebraObjectDisplay.getHTML(term1))
document.body.appendChild(AlgebraObjectDisplay.getHTML(term2))
document.body.appendChild(AlgebraObjectDisplay.getHTML(term3))

},{"./AlgebraObjectDisplay.js":1,"./AlgebraObjects.js":2,"./AppManager.js":3}]},{},[4]);

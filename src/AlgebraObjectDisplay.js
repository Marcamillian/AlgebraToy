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

    // create the bracket
    var bracketHTML = document.createElement('div')
    bracketHTML.classList.add("bracket")

    // add in any sub statements
    statement.getStatements().forEach( (subStatement)=>{
        bracketHTML.appendChild(getStatementHTML(subStatement))
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
    
    console.log("clear these things")
}

module.exports = {
    getHTML:getHTML,
    getStatementHTML,
    updateDisplay: updateDisplay,
    clearStatements: clearStatements
}
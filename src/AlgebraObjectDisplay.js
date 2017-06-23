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

const getStatementHTML = function getStatementHTML(statement){

    // create the statement container
    var statementHTML = document.createElement('div');
    statementHTML.classList.add("statement")

    // create the multiply term
    var multiplyTermHTML = getHTML(statement.getMultiplyTerm());
    multiplyTermHTML.classList.add("multiply-term")

    // create the bracket
    var bracketHTML = document.createElement('div')
    bracketHTML.classList.add("bracket")

    // create the inside Term HTML
    statement.getTerms().forEach((term)=>{
        bracketHTML.appendChild(getHTML(term))
    })


    // combine all of the HTML that we have
    statementHTML.appendChild(multiplyTermHTML)
    statementHTML.appendChild(bracketHTML)

    return statementHTML
}

/*
<div class="statement">
    <div class="multiply-term"> .. </div>
    <div class="bracket">
        <div class="algebra-term"> ... </div>
        <div class="algebra-term"> ... </div>
    </div>
*/

module.exports = {
    getHTML:getHTML,
    getStatementHTML
}
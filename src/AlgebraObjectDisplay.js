

const getHTML = function getHTML(algebraTerm){

    //add the contianer
    var termHTML = document.createElement('div'); // TODO: something wrong with creating a new HTML element
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

        variableHTML.appendChild(power)

        variablesHTML.appendChild(variableHTML)

    })
    

    // assemble all of the components
    termHTML.appendChild(factor);
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
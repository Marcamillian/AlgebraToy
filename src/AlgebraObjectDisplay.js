const AlgebraObjectDisplay = function(arguments){

     const getHTML = function getHTML(algebraTerm){

        //add the contianer
        var termHTML = new Element();
        termHTML.classList.add("algebra-term")
        
        // add the positive sign
        var sign = new Element();
        sign.classList.add("sign")
        sign.innerHTML = (!algebraTerm.positive) ?  "-": "";

        //add the factor
        var factor = new Element();
        factor.classList.add("factor");
        factor.innerHTML = algebraTerm.factor.toString();

        //add the factor
        ////cycle through the vaiables
        var variables = new Element();
        Object.keys(algebraTerm.variables).forEach(function(variable){

            // add the varibale symbol
            var variableHTML = new Element();
            variableHTML.classList.add("variable");
            variableHTML.innerHTML = "x"
            
            // add the power to the varible symbol
            var power = new Element();
            power.classList.add("power")
            power.innerHTML = variable.power.toString()

            variableHTML.appendChild(power)

            variables.appendChild(variableHTML)

        })
        

        // assemble all of the components
        termHTML.appendChild(sign)
        termHTML.appendChild(factor);
        termHTML.appendChild(variables);

        return termHTML
    }

    return Object.assign(
        {getHTML: getHTML}
    )
}
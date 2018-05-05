test = require("tape");
EquationLoader = require("./../src/js/EquationLoader.js")


test("Testing Equation loader creation", (t)=>{

    t.ok(EquationLoader, "Test that factory function loaded")

    let loader = EquationLoader();

    let equation1 = loader.getNextEquationJSON() 
    let equation2 = loader.getNextEquationJSON()
    let originalEquation = loader.getNextEquationJSON();

    t.notok(equation1 == equation2, "Itterates through the equations")
    //t.ok(equation1 == originalEquation, "Looped back to the beginning")

    t.end()
})

test("Parse these into objects", (t)=>{

    let loader = EquationLoader();
    let equation = loader.getNextEquation()

    equation.LHS.getTerms().forEach((term)=>{
        console.log(term.getFactor())
    })


    t.ok(true,"Dummy test whilst I'm trying the function")

    t.end()

})
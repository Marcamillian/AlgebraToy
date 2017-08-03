test = require("tape");
EquationLoader = require("./../src/EquationLoader.js")


test("Testing Equation loader creation", (t)=>{

    t.ok(EquationLoader, "Test that factory function loaded")

    let loader = EquationLoader();

    let equation1 = loader.getNextEquation() 
    let equation2 = loader.getNextEquation()
    let originalEquation = loader.getNextEquation();

    t.notok(equation1 == equation2, "Itterates through the equations")
    t.ok(equation1 == originalEquation, "Looped back to the beginning")

    t.end()
})

test("Parse these into objects", (t)=>{

    let loader = EquationLoader();

    t.ok(true,"Dummy test whilst I'm trying the function")

    //console.log(loader.JSONtoStatement(loader.getNextEquation().LHS))
    
    t.end()

})
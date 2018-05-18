test = require("tape");
EquationLoader = require("./../src/js/EquationLoader.js")
EquationData = require("./t_EquationLoader_data.json")

test("Testing Equation loader creation", (t)=>{

    t.ok(EquationLoader, "Test that factory function loaded")

    let loader = EquationLoader(EquationData);

    let equation1 = loader.getNextEquationJSON() 
    let equation2 = loader.getNextEquationJSON()
    let equation3 = loader.getNextEquationJSON()
    let originalEquation = loader.getNextEquationJSON();

    t.notok(equation1 == equation2, "Itterates through the equations")
    t.ok(equation1 == originalEquation, "Looped back to the beginning")

    t.end()
})

test("Parse these into objects", (t)=>{

    let loader = EquationLoader(EquationData);
    let equation = loader.getNextEquation()


    t.ok(true,"Dummy test whilst I'm trying the function")

    t.end()

})
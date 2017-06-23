test = require('tape')
AlgebraTerm = require('./../src/AlgebraObjects.js').AlgebraTerm;
AlgebraStatement = require('./../src/AlgebraObjects.js').AlgebraStatement;
AlgebraObjectDisplay = require('./../src/AlgebraObjectDisplay.js')

var getTestObjects = function getTestObjects(){
    var terms = [ AlgebraTerm({factor: 2, variables:{x:{power:2}} }),
                  AlgebraTerm({factor: 2, variables:{y:{power:2}} }),
                  AlgebraTerm({factor: 2 })
    ] 

    var statement = AlgebraStatement([terms[0], terms[1]])
    statement.setMultiplyTerm(terms[2])

    return {
        terms: terms,
        statement: statement
    }
}

/*
test("Testing the term display", (t)=>{
    var objs = getTestObjects();

    var displayHTML = AlgebraObjectDisplay.getHTML(objs.terms[0])
    t.ok(displayHTML.querySelector('.factor'), "Has a factor class div")
    t.equal(displayHTML.querySelector('.factor').textContent, '2', "The factor is correct")

    document.body.appendChild(displayHTML)

    t.ok(true, "Checking the test suite works")
})*/

test("Testing the statement display", (t)=>{

    console.log("Is this running")
    var objs = getTestObjects();

    var displayHTML = AlgebraObjectDisplay.getStatementHTML(objs.statement);
    document.body.appendChild(displayHTML)

    t.ok(true, "Is this running?")
    t.end()

})
test = require('tape')
AlgebraTerm = require('./../src/AlgebraObjects.js').AlgebraTerm;
AlgebraStatement = require('./../src/AlgebraObjects.js').AlgebraStatement;
AlgebraObjectDisplay = require('./../src/AlgebraObjectDisplay.js')
AppManager = require('./../src/AppManager').AppManager


var getTestObjects = function getTestObjects(){
    var terms = [ AlgebraTerm({factor: 2, variables:{y:{power:2}} }),   // LHS
                  AlgebraTerm({factor: 2, variables:{x:{power:2}} }),
                  AlgebraTerm({factor: 2 }),
                  AlgebraTerm({factor: 2, variables:{x:{power:2}} }),   // sub Statement
                  AlgebraTerm({factor: 2, variables:{x:{power:2}} }),
                  AlgebraTerm({factor: 2 }),
                  AlgebraTerm({factor: 2, variables:{x:{power:2}} }),   // RHS
                  AlgebraTerm({factor: 2, variables:{x:{power:2}} }),
                  AlgebraTerm({factor: 4 }),
    ] 

    var LHS = AlgebraStatement([terms[0], terms[1]])
    LHS.setMultiplyTerm(terms[2])
    var RHS = AlgebraStatement([terms[6], terms[7]])
    RHS.setMultiplyTerm(terms[8])

    var subStatement = AlgebraStatement([terms[3], terms[4]])
    subStatement.setMultiplyTerm(terms[5])

    return {
        terms: terms,
        statements: {LHS : LHS,
                     RHS: RHS,
                     subStatement: subStatement}
    }
}


test.skip("Testing the term display", (t)=>{
    var objs = getTestObjects();

    var displayHTML = AlgebraObjectDisplay.getHTML(objs.terms[0])
    t.ok(displayHTML.querySelector('.factor'), "Has a factor class div")
    t.equal(displayHTML.querySelector('.factor').textContent, '2', "The factor is correct")

    document.body.appendChild(displayHTML)

    t.ok(true, "Checking the test suite works")
})

test.skip("Testing the statement display", (t)=>{

    console.log("Is this running")
    var objs = getTestObjects();

    var displayHTML = AlgebraObjectDisplay.getStatementHTML(objs.statements.LHS);
    document.body.appendChild(displayHTML)

    t.ok(true, "Is this running?")
    t.end()

})

test.skip("Testing subStatement display", (t)=>{
    var objs = getTestObjects();

    objs.statements.LHS.addStatement(objs.statements.subStatement); // add the subStatement

    var displayHTML = AlgebraObjectDisplay.getStatementHTML(objs.statements.LHS);

    document.body.appendChild(displayHTML);
})

test.skip("Testing the AppManager clicks", (t)=>{
    var objs = getTestObjects();

    AppManager = AppManager(objs.statements.LHS, objs.statements.RHS);

    
    var LHSHtml = AlgebraObjectDisplay.getStatementHTML(AppManager.getStatement("LHS"), AppManager.termSelect)
    var RHSHtml = AlgebraObjectDisplay.getStatementHTML(AppManager.getStatement("RHS"), AppManager.termSelect)

    document.body.appendChild(LHSHtml);
    document.body.appendChild(RHSHtml);

    t.end()
})

test("Testing the AppManager clicks", (t)=>{
    var objs = getTestObjects();

    AppManager = AppManager(objs.statements.LHS, objs.statements.RHS);
    
    var clickFunction = function(term){
        AppManager.termSelect(term);
        AlgebraObjectDisplay.clearStatements(); // clear out the statements that were there before
        AlgebraObjectDisplay.updateDisplay(AppManager.getStatements(), clickFunction)
    }

    // display the initial state
    AlgebraObjectDisplay.updateDisplay(AppManager.getStatements(), clickFunction)
    

    t.end()
})


test = require('tape')

var AppManager = require("../src/AppManager.js").AppManager
var AlgebraStatement = require("../src/AlgebraObjects.js").AlgebraStatement;
var AlgebraTerm = require("../src/AlgebraObjects.js").AlgebraTerm;

getTestSetup = function getTestSetup(){
    var terms = [
        AlgebraTerm({factor: 2, variables: {x:{power:1}} }),
        AlgebraTerm({factor: 3, variables: {x:{power:1}} }),
        AlgebraTerm({factor: 2, variables: {y:{power:1}} }),
        AlgebraTerm({factor: 2, variables: {y:{power:1}} }),
        AlgebraTerm({factor: 3, variables: {x:{power:2}} }),
        AlgebraTerm({factor: 4})
    ]

    var statements = [
        AlgebraStatement([terms[0], terms[1]], undefined, "LHS"),
        AlgebraStatement([terms[2], terms[3]], undefined, "RHS"),
        AlgebraStatement([terms[4]], undefined, "nestedStatement")
    ]

    statements[2].setMultiplyTerm(terms[5]) // setting a multiply term for the nested statement

    var appManager = AppManager(statements[0], statements[1])
    statements[0].addStatement(statements[2]) // nesting a statement

    return {terms: terms,
            statements: statements,
            appManager: appManager
    }
}

test("testing the setup",(t)=>{
    var objs = getTestSetup();

    t.test("Checking the object is correct", (ts)=>{
        ts.ok(objs.terms," obj has terms")
        ts.ok(objs.statements, "obj has statements")
        ts.ok(objs.appManager, "obj has a manager")
        ts.end()
    })

    t.test("Testing the terms have correct parents", (ts)=>{
        ts.ok(objs.statements[0].includesTerm(objs.terms[0]));
        ts.ok(objs.statements[1].includesTerm(objs.terms[2]));
        ts.end()
    })

    t.test("Testing the nested statement", (ts)=>{
        ts.ok(objs.statements[0].includesStatement(objs.statements[2]),"LHS contains the nested statement" )
        ts.notok(objs.statements[1].includesStatement(objs.statements[2]),"RHS does not contain the nested statement" )
        ts.equal( objs.statements[2].getMultiplyTerm(), objs.terms[5], "Nested statement has the right multiply term")
        ts.end()
    })

    t.end()
})

test("testing the click interactions", (t)=>{
    var objs = getTestSetup();

    // tetsing the add click interaction
    t.equals(objs.appManager.termSelect(objs.terms[0]), "term set", "Term is being selected")
    t.equals(objs.appManager.getSelectedTerm(), objs.terms[0], "Check that the term is the selected term");
    t.ok(objs.terms[0].isSelected(), "Checking that the term is selected")
    //t.ok(objs.statements[0].isSelectedStatement())

    var resultObject = objs.appManager.termSelect(objs.terms[1]);

    t.equals(resultObject.operation, "add", "The terms clicked should add")
    t.equals(resultObject.result.getState().factor, 5, "Checking the factor is alright");
    t.ok(resultObject.result.getVariables().x, "Checking the variable is alright");
    t.equal(resultObject.result.getVariables().x.power, 1, "Checking the variable is alright");

    t.ok(objs.statements[0].includesTerm(resultObject.result), "Check that the result was put in the LHS")
    t.notok(objs.statements[0].includesTerm(objs.terms[0]), "First Term is removed")
    t.notok(objs.statements[0].includesTerm(objs.terms[1]), "Second Term is removed")

    t.equals(objs.appManager.getSelectedTerm(), undefined, "Check that the selected term has reset");

    // checking the terms know they are deselected
    t.notok(objs.terms[0].isSelected())
    t.notok(objs.terms[1].isSelected())
    //t.notok(objs.statements[0].isSelectedStatement())

    t.end()
    
})

test("Testing the multiply click interaction", (t)=>{

    var objs = getTestSetup()

        // test the multiply interaction
    t.equals(objs.appManager.termSelect(objs.terms[4]), "term set", "Selecting the first term in the nested statement")
    t.ok(objs.appManager.getSelectedTerm(), objs.terms[4], "Term is selected")
    t.ok(objs.terms[4].isSelected(), "Checking that the term knows its selected")

    var resultObject = objs.appManager.termSelect(objs.terms[5])
    t.equals(resultObject.operation, "multiply", "Clicking the nested statements multiplyTerm")

    t.ok(resultObject.result, "result is received")
    t.equals(resultObject.result.getFactor(),12, "The factor is correctly multipled" )
    t.ok(resultObject.result.getVariables().x)
    t.equal(resultObject.result.getVariables().x.power, 2, "The multiplied variable power is correct")

    t.ok(objs.statements[0].includesTerm(resultObject.result), "result has been added outside the nested term (in LHS)")
    t.notok(objs.statements[0].includesStatement(objs.statements[2]), "The now empty statement has been removed")

    t.equals(objs.appManager.getSelectedTerm(), undefined, "Check that the selected term has reset");
    
    // checking the terms know they are deselected
    t.notok(objs.terms[4].isSelected())
    t.notok(objs.terms[5].isSelected())

    t.end()
})
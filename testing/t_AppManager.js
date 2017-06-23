test = require('tape')

var AppManager = require("../src/AppManager.js").AppManager
var AlgebraStatement = require("../src/AlgebraObjects.js").AlgebraStatement;
var AlgebraTerm = require("../src/AlgebraObjects.js").AlgebraTerm;

getTestSetup = function getTestSetup(){
    var terms = [
        AlgebraTerm({factor: 2, variable:'x'}),
        AlgebraTerm({factor: 3, variable:'x'}),
        AlgebraTerm({factor: 2, variable:'y'}),
        AlgebraTerm({factor: 2, variable:'y'}),
        AlgebraTerm({factor: 3}),
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
    t.equals(objs.appManager.termSelect(objs.terms[1]), "add", "The terms clicked should add")

    t.equals(objs.appManager.getSelectedTerm(), undefined, "Check that the selected term has reset");

    // test the multiply interaction
    t.equals(objs.appManager.termSelect(objs.terms[4]), "term set", "Selecting the first term in the nested statement")
    t.ok(objs.appManager.getSelectedTerm(), objs.terms[4], "Term is selected")
    t.equals(objs.appManager.termSelect(objs.terms[5]), "multiply", "Clicking the nested statements multiplyTerm")
    t.end()
    
})
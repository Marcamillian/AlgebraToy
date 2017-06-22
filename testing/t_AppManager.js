test = require('tape')

var AppManager = require("../src/AppManager.js").AppManager
var AlgebraStatement = require("../src/AlgebraObjects.js").AlgebraStatement;
var AlgebraTerm = require("../src/AlgebraObjects.js").AlgebraTerm;


test("Creating the appManager", (t)=>{
    var term1 = AlgebraTerm({factor: 2, variable:'x'});
    var term2 = AlgebraTerm({factor: 3, variable:'x'});
    var term3 = AlgebraTerm({factor: 2, variable:'y'});
    var term4 = AlgebraTerm({factor: 2, variable:'y'});
    var term5 = AlgebraTerm({factor: 3})
    var term6 = AlgebraTerm({factor: 4})

    var statement1 = AlgebraStatement([term1, term2], undefined, "LHS")
    statement1.setMultiplyTerm(term5)
    var statement2 = AlgebraStatement([term3, term4], undefined, "RHS")
    statement2.setMultiplyTerm(term6)
    
    var appManager = AppManager(statement1, statement2) // create the app manager (with a left and right hand side)
    
    t.equal(statement2.getMultiplyTerm().getFactor(), 4, "check that the multiply term is applied");
    t.equal(statement2.getMultiplyTerm(), term6, "check that the term is correct")
    
    t.ok(statement1.includesTerm(term1), "LHS statement includes term1");
    t.ok(statement2.includesTerm(term3), "RHS statement includes term3");
    t.ok(statement2.includesTerm(term4), "RHS statement includes term4");

    t.test("checking the statement getName", (ts)=>{
        t.equal(statement1.getName(), "LHS")
        t.equal(statement2.getName(), "RHS")
        ts.end()
    })

    t.test("Checking the parents of the terms after adding to statements", function(ts){ // TODO: this is not working
        ts.ok(term1.getParent() == term2.getParent())
        ts.ok(term3.getParent() == term4.getParent())
        ts.ok(term3.getParent() == term6.getParent())
        //ts.ok(statement2 == term5.getParent()) // TODO : failing
        ts.end()
    })

    t.test("checking the appManager same statement", (ts)=>{
        ts.ok(appManager.sameStatement(term1, term2), "terms in the LHS");
        ts.ok(appManager.sameStatement(term3, term4), "terms in the RHS");
        ts.ok(appManager.sameStatement(term3, term6), "multiply term and term in the RHS");
        ts.end()
    })

    // Testing click statements

    t.test("clicking inside same statement", function(ts){
        appManager.termSelect(term1);
        ts.ok(appManager.getSelectedTerm)
        ts.equal(appManager.getSelectedTerm(), term1);
        ts.equal(appManager.termSelect(term2), "add", "checking the add operator is fired")
        ts.equal(appManager.getSelectedTerm(), undefined, "checking the the selected term is cleared")
        ts.end()
    })
    

    t.test("click on different statements", function(ts){ // this test failing
        appManager.termSelect(term1);
        ts.equal(appManager.termSelect(term4), "not same statement")
        ts.end()
    })

    t.test("clicking inside same statement", function(ts){  // TODO: This is the thing

        // working for statement 1
        appManager.termSelect(term1);
        t.equal(appManager.getSelectedTerm(), term1, "Term1 is selected in the app manager");
        ts.equal(appManager.termSelect(term5), "multiply", "clicking on the multiplyTerm and something inside the brackets will multiply")

        // not working for statement 2
        t.ok(term6.getParent() == term4.getParent(), "checking that the parents are the same")
        t.ok(term6.getParent(), statement2, "term6 belongs to statement2")
        appManager.termSelect(term6);
        t.equal(appManager.getSelectedTerm(), term6, "term6 set as the selectedTerm")
        ts.equal(appManager.termSelect(term4), "multiply", "clicking on the multiplyTerm and something inside the brackets will multiply")
        ts.end()
    })

    t.end()
})
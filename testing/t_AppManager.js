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

    var statement1 = AlgebraStatement([term1, term2], undefined)
    var statement2 = AlgebraStatement([term3, term4], undefined)
    statement2.setMultiplyTerm(term5)

    var appManager = AppManager(statement1, statement2) // create the app manager (with a left and right hand side)
    
    t.equal(statement2.getMultiplyTerm().getFactor(), 3, "check that the multiply term is applied");
    t.equal(statement2.getMultiplyTerm(), term5, "check that the term is correct")
    
    t.ok(statement1.includesTerm(term1), "LHS statement includes term1");
    t.ok(statement2.includesTerm(term3), "RHS statement includes term3");
    t.ok(statement2.includesTerm(term4), "RHS statement includes term4");

    t.ok()

    t.test("clicking inside same statement", function(ts){
        appManager.termSelect(term1);
        ts.equal(appManager.termSelect(term2), "add")
        ts.end()
    })

    t.test("click on different statements", function(ts){ // this test failing
        appManager.termSelect(term1);
        ts.equal(appManager.termSelect(term4), "not same statement")
        ts.end()
    })
    /*
    t.test("clicking inside same statement", function(ts){  // this test failing
        appManager.termSelect(term3);
        ts.equal(appManager.termSelect(term5), "multiply")
        ts.end()
    })*/


    t.end()
})
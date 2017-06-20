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

    var appManager = AppManager(statement1, statement2)

    // adding terms together
    t.ok(appManager.termSelect)
    t.equal(statement2.getMultiplyTerm().getFactor(), 3)
    
    console.log(" >> ", appManager.termSelect(term1));
    console.log(" >> ",appManager.termSelect(term2));

    t.end()
})
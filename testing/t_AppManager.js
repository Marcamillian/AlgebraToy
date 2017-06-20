test = require('tape')

AppManager = require("../src/AppManager.js").AppManager()
AlgebraStatement = require("../src/AlgebraObjects.js").AlgebraStatement;
AlgebraTerm = require("../src/AlgebraObjects.js").AlgebraTerm;

test("Testing click interaction", function(t){
    var term1 = AlgebraTerm({factor: 2, variable:'x'});
    var term2 = AlgebraTerm({factor: 3, variable:'y'});
    var term3 = AlgebraTerm({factor: 2, variable:'x'});

    var statement = AlgebraStatement([term1, term2])

    t.ok(statement.includesTerm(term1))

    t.end()
})
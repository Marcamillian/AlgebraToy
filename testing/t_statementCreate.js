test = require('tape')
AlgebraTerm = require('./../src/AlgebraObjects.js').AlgebraTerm;
AlgebraStatement = require('./../src/AlgebraObjects.js').AlgebraStatement

test("testing statement creation", function(t){
    var term1 = AlgebraTerm({ factor: 4, variables:{ 'x': {'power':4} } })
    var term2 = AlgebraTerm({ factor: -4, variables:{ 'y': {'power':2} } })
    var term3 = AlgebraTerm({factor:4})

    var statement = AlgebraStatement([term1, term2]);

    t.ok(statement)
    t.equal(statement.getMultiplyTerm().getFactor(), 1)
    t.ok(statement.includesTerm(term1), "testing to see if it includes term")
    statement.setMultiplyTerm(term3)
    t.equal(statement.getMultiplyTerm().getFactor(), 4)

    t.end()
})

test("Testing click interaction", function(t){
    var term1 = AlgebraTerm({factor: 2, variable:'x'});
    var term2 = AlgebraTerm({factor: 3, variable:'y'});
    var term3 = AlgebraTerm({factor: 2, variable:'x'});

    var statement = AlgebraStatement([term1, term2])

    t.ok(statement.includesTerm(term1))
    t.notok(statement.includesTerm(term3))

    t.end()
})
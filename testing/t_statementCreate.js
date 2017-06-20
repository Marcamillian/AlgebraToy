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
    t.ok(statement.hasTerm(term1), "testing to see if it includes term")
    statement.multiplyStatement(term3)
    t.equal(statement.getMultiplyTerm().getFactor(), 4)

    t.end()
})
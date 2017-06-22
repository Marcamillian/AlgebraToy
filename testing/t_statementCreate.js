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
    t.end()
})

test("Checking that the statement has all the required functions",(t)=>{
    var term1 = AlgebraTerm({factor: 2, variable:'7'})
    var term2 = AlgebraTerm({factor:2, variable: 'y'}) 
    var statement1 = AlgebraStatement([term1, term2])

    t.ok(statement1.getMultiplyTerm, "multiply term present")
    t.ok(statement1.getParent, "getParent present")
    t.ok(statement1.setMultiplyTerm, "set multiplyTerm present")
    t.ok(statement1.multiplyStatement, "multiply statement present")
    t.ok(statement1.includesTerm, "includes term present")
    t.ok(statement1.removeTerm, "remove term present")
    t.ok(statement1.getName, "getName present")
    t.end()
})

test("testing adding terms to a statement", (t)=>{
    var term1 = AlgebraTerm({factor: 2, variable:'x'})
    var term2 = AlgebraTerm({factor:2, variable: 'y'}) 
    var statement1 = AlgebraStatement([term1, term2])

    var term3 = AlgebraTerm({factor: 4, variable:'a'})
    var term4 = AlgebraTerm({factor:2, variable: 'b'}) 
    var statement2 = AlgebraStatement([term3, term4])

    t.notok(statement1.getParent(), "statement shouldn't have  a parent")
    t.ok(term1.getParent(), "contained term has a parent")
    t.ok(term2.getParent(),  "contained term has a parent")
    t.ok(term1.getParent(), statement1, "statement is the parent")
    t.ok(term2.getParent(), statement1, "statement is the parent")

    t.ok(term3.getParent(), "contained term has a parent")
    t.ok(term4.getParent(),  "contained term has a parent")
    t.ok(term3.getParent(), statement2, "statement is the parent")
    t.ok(term4.getParent(), statement2, "statement is the parent")

    t.end()
})

test("Testing includesTerm", function(t){
    var term1 = AlgebraTerm({factor: 2, variable:'x'});
    var term2 = AlgebraTerm({factor: 3, variable:'y'});
    var term3 = AlgebraTerm({factor: 2, variable:'x'});

    var statement = AlgebraStatement([term1, term2])

    t.ok(statement.includesTerm(term1))
    t.notok(statement.includesTerm(term3))

    t.end()
})

test("Testing getName", function(t){
    var term1 = AlgebraTerm({factor: 2, variable:'x'});
    var term2 = AlgebraTerm({factor: 3, variable:'y'});
    var term3 = AlgebraTerm({factor: 2, variable:'x'});

    var statement = AlgebraStatement([term1, term2], undefined, "some statement")

    t.ok(statement.getName, "getName exisits")
    t.equal(statement.getName(), "some statement")
    t.end()
})

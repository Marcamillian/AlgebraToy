test = require('tape')
AlgebraTerm = require('./../src/AlgebraObjects.js').AlgebraTerm;
AlgebraStatement = require('./../src/AlgebraObjects.js').AlgebraStatement

getTestStatement = function getTestStatement(){
    terms = [ AlgebraTerm({factor: 2, variable:'x'}),
             AlgebraTerm({factor: 3, variable:'y'}),
             AlgebraTerm({factor:4})
    ]

    statement = AlgebraStatement([terms[0], terms[1]], undefined, "some statement")
    statement.setMultiplyTerm(terms[2])

    return { terms: terms,
             statement: statement}
}

test("testing statement creation", function(t){
    var term1 = AlgebraTerm({ factor: 4, variables:{ 'x': {'power':4} } })
    var term2 = AlgebraTerm({ factor: -4, variables:{ 'y': {'power':2} } })
    var term3 = AlgebraTerm({factor:4})

    var statement = AlgebraStatement([term1, term2]);

    t.ok(statement)
    t.equal(statement.getMultiplyTerm().getFactor(), 1)
    t.end()
})

test("Creating a statement with no inputs", (t)=>{

    var objs = getTestStatement()

    var statement = AlgebraStatement([], undefined, undefined);
    t.ok(statement, "Seeing that a statement is created");
    t.notok(statement.isSelectedStatement(), "Testing functions work")

    statement.addStatement(objs.statement);

    t.ok(statement.includesStatement(objs.statement), "Checking that we have added a sub statement");

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

test("Testing removeTerm", function (t){
    var term1 = AlgebraTerm({factor: 2, variable:'x'});
    var term2 = AlgebraTerm({factor: 3, variable:'y'});
    var statement = AlgebraStatement([term1, term2], undefined, "some statement")

    statement.removeTerm(term1);

    t.notok(statement.includesTerm(term1), "term 1 removed");
    t.ok(statement.includesTerm(term2), "term2 still there");
    t.end()
})

test("Testing addStatement", function(t){
    var term1 = AlgebraTerm({factor: 1, variable:'x'});
    var term2 = AlgebraTerm({factor: 2, variable:'y'});
    var term3 = AlgebraTerm({factor: 3, variable:'y'});
    var term4 = AlgebraTerm({factor: 4, variable:'y'});

    var statement = AlgebraStatement([term1, term2], undefined, "some statement")
    var childStatement = AlgebraStatement([term3,term4], undefined, "childStatement")
    statement.addStatement(childStatement)


    t.ok(statement.includesStatement(childStatement), "The child is part of the statement");
    t.equals(childStatement.getParent(), statement, "Parent is set on the child")
    t.end()
})

test("Testing remove statement", function(t){
    var term1 = AlgebraTerm({factor: 1, variable:'x'});
    var term2 = AlgebraTerm({factor: 2, variable:'y'});
    var term3 = AlgebraTerm({factor: 3, variable:'y'});
    var term4 = AlgebraTerm({factor: 4, variable:'y'});

    var statement = AlgebraStatement([term1, term2], undefined, "some statement")
    var childStatement = AlgebraStatement([term3,term4], undefined, "childStatement")
    statement.addStatement(childStatement);

    t.ok(statement.includesStatement(childStatement), "The child is part of the statement");
    t.equals(childStatement.getParent(), statement, "Parent is set on the child")

    // remove the child
    statement.removeStatement(childStatement);
    t.notok(statement.includesStatement(childStatement))
    t.notok(statement.removeStatement(statement), "Checking we can't remove it again")

    t.end()
})

test("Testing isMultiplyTerm", (t)=>{
    objs = getTestStatement();

    t.ok(objs.statement.isMultiplyTerm(objs.terms[2]), "Testing to see if the multiply terms is correct")
    t.notok(objs.statement.isMultiplyTerm(objs.terms[1]), "Testing to see if the function fails for something that isn't multiply term")
    t.end()
})
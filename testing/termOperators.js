test = require('tape');

var AlgebraObjects = require('./../src/AlgebraObjects.js')

test('Addition/subtraction Testing', function(t){

    t.test('Terms that should work', function(ts){
        
        var term = AlgebraObjects.AlgebraTerm;
        var term1 = term({ factor: 4 })
        var term2 = term({ factor: 2 })
        var term3 = term({ factor: -4 })
        var term4 = term({ factor: -2 })

        var term5 = term({ factor: 4, variables:{x:{power:2}} })
        var term6 = term({ factor: 2, variables:{x:{power:2}} })

        // combining both positive
        var result = AlgebraObjects.TermOperators.add(term1, term2)
        ts.equal(result.getFactor(), 6)

        // combining positive & negative
        var result =AlgebraObjects.TermOperators.add(term1, term4)
        ts.equal(result.getFactor(), 2)

        // combining both negative
        var result = AlgebraObjects.TermOperators.add(term3, term4)
        ts.equal(result.getFactor(), -6)


        var result = AlgebraObjects.TermOperators.add(term5, term6)
        ts.equal(result.getFactor(), 6)

        ts.end()
    })

    t.test('Terms that should error ', function(ts){

        var term = AlgebraObjects.AlgebraTerm;
        var term1 = term({factor: 4, variables:{x:{power:2}} })
        var term2 = term({factor: 2, variables:{y:{power:2}} })
        var term3 = term({factor: -2, variables:{x:{power:4}} })
        var term4 = term({factor: -4, variables:{x:{power:2}} })

        // no factor - variables differ
            // variables differ
        ts.throws(function(){AlgebraObjects.TermOperators.add(term1, term2)}, /variables don't match/i, "add different variables")
            // powers differ
        ts.throws(function(){AlgebraObjects.TermOperators.add(term1, term3)}, /variables don't match/i, "add different powers")

            // combining to 0
        ts.throws(function(){AlgebraObjects.TermOperators.add(term1, term4)} , /Terms cancelled each other/i)
        
        ts.end()
    })
})

test('Multiplicaton Testing', function(t){

    var term = AlgebraObjects.AlgebraTerm;
    var term1 = term({factor:2})
    var term2 = term({factor:-2});
    var term3 = term({factor: 3, variables:{x:{power:2}} } )
    var term4 = term({factor:4, variables:{y:{power:1}} } )
    
    var result = AlgebraObjects.TermOperators.multiply(term1, term2);
    t.equals(result.getFactor(),-4)

    var result = AlgebraObjects.TermOperators.multiply(term1, term1)
    t.equals(result.getFactor(), 4);

    var result = AlgebraObjects.TermOperators.multiply(term3, term3);
    t.equals(result.getFactor(), 9);
    t.ok(result.getVariables()['x']);
    t.equals(result.getVariables()['x'].power, 4)

    var result = AlgebraObjects.TermOperators.multiply(term3, term4);
    t.equals(result.getFactor(), 12)
    var resultVars = result.getVariables()
    t.ok(resultVars['x']);
    t.ok(resultVars['y']);
    t.equals(resultVars['x'].power, 2)
    t.equals(resultVars['y'].power, 1)

    t.end()
})

test.skip('Division Testing', function(t){
    t.end()
} )
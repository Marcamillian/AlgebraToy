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

test('Division Testing', function(t){

    var term = AlgebraObjects.AlgebraTerm;
    var term1 = term({factor:2})
    var term2 = term({factor:-2});
    var term3 = term({factor: 3, variables:{x:{power:2}} } )
    var term4 = term({factor:4, variables:{y:{power:1}} } )
    var term5 = term({factor: 1, variables:{x:{power:1}} } )
    var term6 = term({ factor: 3, variables:{ x:{power:3}, y:{power:1} } } )
    var term7 = term({ factor: 1, variables:{ x:{power:3} } } )

    // divide factors only as a whole number
    var result = AlgebraObjects.TermOperators.divide(term1, term1)
    t.equals(result.getFactor(), 1)

    // divide factors & variables if whole number (variables compatable)
    var result = AlgebraObjects.TermOperators.divide(term3, term5);
    t.equals(result.getFactor(), 3);
    t.ok(result.getVariables()['x']);
    t.equals(result.getVariables()['x'].power, 1)

    // divide factors and variables with additional variables
    var result = AlgebraObjects.TermOperators.divide(term6, term3)
    t.equals(result.getFactor(), 1);
    t.ok(result.getVariables()['x']);
    t.equals(result.getVariables()['x'].power, 1)
    t.ok(result.getVariables()['y']);
    t.ok(result.getVariables()['y'].power, 1)

    // divide variable powers that will result in a 0 power
    var result = AlgebraObjects.TermOperators.divide(term6, term7)
    t.equals(result.getFactor(), 3);
    t.notok(Object.keys(result.getVariables()).includes('x'));
    t.ok(result.getVariables()['y'])
    t.equals(result.getVariables()['y'].power, 1)


    // factors don't divide by a whole number
    t.throws(()=>{AlgebraObjects.TermOperators.divide(term4, term3)}, /factor not whole number/i)

    // variables are not compatabile
    t.throws(()=>{AlgebraObjects.TermOperators.divide(term4, term5)}, /variables not compatible/i)

    t.end()
} )
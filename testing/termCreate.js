test = require('tape');

var AlgebraObjects = require('./../src/AlgebraObjects.js')

test('Term Creation', function(t){

    t.test('checking no argument creation', function(ts){
        var testTerm = AlgebraObjects.AlgebraTerm()
        ts.equal(testTerm.getState().positive, true);
        ts.equal(testTerm.getState().factor, 1);
        ts.equal(Object.keys(testTerm.getState().variables).length, 0)

        var testTerm = AlgebraObjects.AlgebraTerm({})
        ts.equal(testTerm.getState().positive, true);
        ts.equal(testTerm.getState().factor, 1);
        ts.equal(Object.keys(testTerm.getState().variables).length, 0)

        ts.end()
    })

    // testing positive term
    t.test('Checking sign', function(ts){
        var testTerm = AlgebraObjects.AlgebraTerm({positive: false});
        ts.equal(testTerm.getState().positive, false);

        ts.end()
    });

    // testing factor term
    t.test('Checking factor', function(ts){
        var testTerm = AlgebraObjects.AlgebraTerm({factor: 3});
        ts.equal(testTerm.getState().factor, 3)

        ts.end()
    })

    // testing term with varable
    t.test('Checking variable', function(ts){
        var testTerm = AlgebraObjects.AlgebraTerm({variables: {'x':{'power':3}}})
        ts.ok(testTerm.getState().variables['x'])
        ts.equal(testTerm.getState().variables['y'], undefined )
        ts.equal(testTerm.getState().variables['x'].power, 3)


        // testing term with two variables 
        var testTerm = AlgebraObjects.AlgebraTerm({variables: {'y':{'power':3},
                                                                'x':{'power': 4}
                                                }})
        ts.ok(testTerm.getState().variables['y'])
        ts.equal(testTerm.getState().variables['y'].power, 3)
        ts.ok(testTerm.getState().variables['x'])
        ts.equal(testTerm.getState().variables['x'].power, 4)

        // testing term with no power stated

        var testTerm = AlgebraObjects.AlgebraTerm({variables: {'y':{} } });
        ts.ok(testTerm.getState().variables['y']);
        ts.equal(testTerm.getState().variables['y'].power, 1)

        ts.end()
    })

    t.end()
})

test("creating two parallel objects", function(t){

    var term1 = AlgebraObjects.AlgebraTerm({variables:{'x':{'power':1} } });
    var term2 = AlgebraObjects.AlgebraTerm({variables: {'y':{'power':1} } });

    t.ok(term1.getState().variables['x']);
    t.ok(term2.getState().variables['y'])

    t.end();
})
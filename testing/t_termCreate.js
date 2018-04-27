let test = require('tape');

const AlgebraObjects = require('./../src/js/AlgebraObjects.js')  

test('Term Creation', function(t){

    t.test('checking no argument creation', function(ts){
        var testTerm = AlgebraObjects.AlgebraTerm()
        ts.ok(testTerm.getState().factor > 0);
        ts.equal(testTerm.getFactor(), 1);
        ts.equal(Object.keys(testTerm.getVariables()).length, 0)

        testTerm = AlgebraObjects.AlgebraTerm({})
        ts.ok(testTerm.getFactor() > 0);
        ts.equal(testTerm.getFactor(), 1);
        ts.equal(Object.keys(testTerm.getVariables()).length, 0)

        ts.end()
    })

    // testing positive term
    t.test('Checking sign', function(ts){
        var testTerm = AlgebraObjects.AlgebraTerm({factor: -1});
        ts.notok(testTerm.getFactor() > 0);

        ts.end()
    });

    // testing factor term
    t.test('Checking factor', function(ts){
        var testTerm = AlgebraObjects.AlgebraTerm({factor: 3});
        ts.equal(testTerm.getFactor(), 3)

        ts.end()
    })

    // testing term with varable
    t.test('Checking variable', function(ts){
        var testTerm = AlgebraObjects.AlgebraTerm({variables: {'x':{'power':3}}})
        ts.ok(testTerm.getVariables().x)
        ts.equal(testTerm.getVariables().y, undefined )
        ts.equal(testTerm.getVariables().x.power, 3)


        // testing term with two variables 
        testTerm = AlgebraObjects.AlgebraTerm({variables: {'y':{'power':3},
                                                                'x':{'power': 4}
                                                }})
        ts.ok(testTerm.getVariables().y)
        ts.equal(testTerm.getVariables().y.power, 3)
        ts.ok(testTerm.getVariables().x)
        ts.equal(testTerm.getVariables().x.power, 4)

        // testing term with no power stated

        testTerm = AlgebraObjects.AlgebraTerm({variables: {'y':{} } });
        ts.ok(testTerm.getVariables().y);
        ts.equal(testTerm.getVariables().y.power, 1)

        ts.end()
    })

    t.end()
})

test("creating two parallel objects", function(t){

    var term1 = AlgebraObjects.AlgebraTerm({variables:{'x':{'power':1} } });
    var term2 = AlgebraObjects.AlgebraTerm({variables: {'y':{'power':1} } });

    t.ok(term1.getState().variables.x);
    t.ok(term2.getState().variables.y)

    t.end();
})

test.skip("Altering the state object after return", function(t){ // TODO: get this sorted
    var testTerm = AlgebraObjects.AlgebraTerm();

    var termResultsVar = testTerm.getVariables(); 
    var termResultsFactor = testTerm.getFactor();
    
    termResultsFactor = 3;
    termResultsVar.x = {power:2}

    // check that we really did change them
    t.equal(termResultsFactor, 3)
    t.ok(termResultsVar.x)
    t.equals(termResultsVar.x.power, 2)

    // check that we didn't alter the original
    t.equal(Object.keys(testTerm.getVariables()).length, 0)
    t.equal(testTerm.getState().factor, 1)

    t.end()
})
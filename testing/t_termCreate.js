test = require('tape');

var AlgebraObjects = require('./../src/AlgebraObjects.js')  
var AlgebraOperators = AlgebraObjects.TermOperators

test('Term Creation', function(t){

    t.test('checking no argument creation', function(ts){
        var testTerm = AlgebraObjects.AlgebraTerm()
        ts.ok(testTerm.getState().factor > 0);
        ts.equal(testTerm.getFactor(), 1);
        ts.equal(Object.keys(testTerm.getVariables()).length, 0)

        var testTerm = AlgebraObjects.AlgebraTerm({})
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
        ts.ok(testTerm.getVariables()['x'])
        ts.equal(testTerm.getVariables()['y'], undefined )
        ts.equal(testTerm.getVariables()['x'].power, 3)


        // testing term with two variables 
        var testTerm = AlgebraObjects.AlgebraTerm({variables: {'y':{'power':3},
                                                                'x':{'power': 4}
                                                }})
        ts.ok(testTerm.getVariables()['y'])
        ts.equal(testTerm.getVariables()['y'].power, 3)
        ts.ok(testTerm.getVariables()['x'])
        ts.equal(testTerm.getVariables()['x'].power, 4)

        // testing term with no power stated

        var testTerm = AlgebraObjects.AlgebraTerm({variables: {'y':{} } });
        ts.ok(testTerm.getVariables()['y']);
        ts.equal(testTerm.getVariables()['y'].power, 1)

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

test.skip("Altering the state object directly after return", function(t){ // TODO: get this sorted
    var testTerm = AlgebraObjects.AlgebraTerm();

    var termResults_var = testTerm.getVariables(); 
    var termResults_factor = testTerm.getFactor();

    t.equal(termResults_factor, 1, "Factor is correctly made");
    t.equal(Object.keys(termResults_var).length, 0, "No vars yet")

    // directly changing the variables
    termResults_factor = 3;
    termResults_var['x'] = {power:2}

    // check that we really did change them
    t.equal(termResults_factor, 3, "Look at the updated factor")
    t.ok(termResults_var['x'], "Check that we have a variable")
    t.equals(termResults_var['x'].power, 2, "Check that the power is correct")

    // check that we didn't alter the original
    postChangeVars = testTerm.getVariables()
    t.equal(testTerm.getState().factor, 0, "Check the post change factor") // THIS IS BROKEN! 
    t.equal(Object.keys(postChangeVars).length, 1, "Check the original variable")
    

    t.end()
})

test("Altering an exisiting term", (t)=>{
    let testTerm = AlgebraObjects.AlgebraTerm();

    // check that the term was created as expected
    t.equal(testTerm.getFactor(), 1, "Factor is correctly made");
    t.equal(Object.keys(testTerm.getVariables()).length, 0, "No vars yet")

    // change the term
    testTerm.setFactor(5);
    // check factor change
    t.equal(testTerm.getFactor(), 5, "Factor is correctly made");

    
    // add a variable
    testTerm.addVariable('x', 2)
    // check the variable
    postChangeVars = testTerm.getVariables()
    t.equal(Object.keys([postChangeVars]).length, 1, "Only 1 var");
    t.ok(postChangeVars['x'], "There is an x variable");
    t.equal(postChangeVars['x'].power, 2, "Power of x is 2")
    
    // add another variable
    testTerm.addVariable('y', 5);
    postChangeVars = testTerm.getVariables()
    t.equal( Object.keys(postChangeVars).length , 2, " both x and y vars");
    t.ok(postChangeVars['x'], "There is an x variable");
    t.equal(postChangeVars['x'].power, 2, "Power of x is 2")
    t.ok(postChangeVars['y'], "There is an y variable");
    t.equal(postChangeVars['y'].power, 5, "Power of y is 5")

    // TODO :: Get this worked out - checking that the operations work to modify a term

    // remove the x variable
    testTerm.removeVariable('x');
    postChangeVars = testTerm.getVariables()
    t.equal(Object.keys([postChangeVars]).length, 1, "only y var");
    t.notok(postChangeVars['x'], "There is not an x variable");
    t.ok(postChangeVars['y'], "There is an y variable");
    t.equal(postChangeVars['y'].power, 5, "Power of y is 5")
    
    t.end()

})

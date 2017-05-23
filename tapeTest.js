test = require('tape');

var AlgebraObjects = require('./src/AlgebraObjects.js')

test('basic tests', function(t){

    // testing positive term
    var testTerm = AlgebraObjects.AlgebraTerm({positive: false});
    t.equal(testTerm.getState().positive, false);

    // testing factor term
    var testTerm = AlgebraObjects.AlgebraTerm({factor: 3});
    t.equal(testTerm.getState().factor, 3)

    // testing term with varable
    var testTerm = AlgebraObjects.AlgebraTerm({variables: {'x':{'power':3}}})
    t.ok(testTerm.getState().variables['x'])
    t.equal(testTerm.getState().variables['y'], undefined )
    t.equal(testTerm.getState().variables['x'].power, 3)


    // testing term with two variables 
    var testTerm = AlgebraObjects.AlgebraTerm({variables: {'y':{'power':3},
                                                            'x':{'power': 4}
                                            }})
    t.ok(testTerm.getState().variables['y'])
    t.equal(testTerm.getState().variables['y'].power, 3)
    t.ok(testTerm.getState().variables['x'])
    t.equal(testTerm.getState().variables['x'].power, 4)

    t.end()
})
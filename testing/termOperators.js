test = require('tape');

var AlgebraObjects = require('./../src/AlgebraObjects.js')

test.skip('Addition/subtraction Testing', function(t){
    t.test('Terms without varibles', function(ts){
        
        // combining both positive

        // combining positive & negative

        // combining both negative
        ts.end()
    })

    t.test('Terms with variables ', function(ts){

        // no factor

        // factors included

        // same variable

        // different variables - should fail/error

        // varibles with powers

        // variables with different powers - should fail/error

        ts.end()
    })
})

test.skip('Multiplicaton Testing', function(t){

})

test.skip('Division Testing', function(t){

} )
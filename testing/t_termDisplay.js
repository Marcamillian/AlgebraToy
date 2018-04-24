test = require('tape')
AlgebraObjects = require('./../src/js/AlgebraObjects.js')
AlgebraObjectDisplay = require('./../src/js/AlgebraObjectDisplay.js')

test.skip('testing term HTML', (t)=>{

    var term = AlgebraObjects.AlgebraTerm;
    var term1 = AlgebraObjectDisplay.getHTML(term({ factor: 5, variables: {x:{power:1}} }))

    // check the factor
    t.ok(term1) // term exists
    t.ok(term1.querySelector('.factor')) // has a factor
    t.equal(term1.querySelector('.factor').textContent, '5') // has the right factor
    
    // check the variable
    var variableHTML = term1.querySelectorAll('.variable')
    t.ok(variableHTML);
    t.ok(variableHTML.length, 1) // check there is 1 variable
    t.equal(variableHTML[0].firstChild.nodeValue, 'x') // chcek the correct variable is there

    // check the power 
    var powerHTML = term1.querySelectorAll('.variable .power');
    t.ok(powerHTML);
    t.equal(powerHTML.length, 0); // shouldn't be anything for power - as power of 1 has no representation


    t.end()
})
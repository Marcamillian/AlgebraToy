test = require('tape')
AlgebraObjects = require('./../src/AlgebraObjects.js')
AlgebraObjectDisplay = require('./../src/AlgebraObjectDisplay.js')


test('testing term HTML', (t)=>{

    var term = AlgebraObjects.AlgebraTerm;
    var term1 = AlgebraObjectDisplay.getHTML(term({ factor: 5, variables: {x:{power:1}} }))
    var term2 = term({ factor: 5, variables: {x:{power:2}} })
    var term3 = term({ factor: 5, variables: {y:{power:3}} })

    t.ok(term1) // term exists
    t.ok(term1.querySelector('.factor')) // has a factor
    t.equal(term1.querySelector('.factor').textContent, '5') // has the right factor
    
    var variableHTML = term1.querySelectorAll('.variable')
    t.ok(variableHTML);
    t.ok(variableHTML.length, 1) // check there is 1 variable
    t.equal(variableHTML[0].firstChild.nodeValue, 'x') // chcek the correct variable is there
    
    var powerHTML = term1.querySelectorAll('.variable .power');
    t.ok(powerHTML);
    t.equal(powerHTML.length, 1);
    t.equal(powerHTML[0].firstChild.nodeValue, '1')


    t.end()
})
AlgebraObjects = require('./AlgebraObjects.js');
AlgebraObjectDisplay = require('./AlgebraObjectDisplay.js')

// create a term
var someTerm = AlgebraObjects.AlgebraTerm({ factor: 5, variables:{x:{power:1}} } )

//add the html to the document
document.body.appendChild(AlgebraObjectDisplay.getHTML(someTerm))
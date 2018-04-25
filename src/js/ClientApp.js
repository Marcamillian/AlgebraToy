let AlgebraObjects = require('./AlgebraObjects.js');
let AlgebraObjectDisplay = require('./AlgebraObjectDisplay.js')
let AppManager = require('./AppManager.js').AppManager();

// create a term
var term1 = AlgebraObjects.AlgebraTerm({ factor: 1, variables:{x:{power:1}} } )
var term2 = AlgebraObjects.AlgebraTerm({ factor: 2, variables:{x:{power:1}} } )
var term3 = AlgebraObjects.AlgebraTerm({ factor: 6, variables:{x:{power:1}} } )

//add the html to the document
document.body.appendChild(AlgebraObjectDisplay.getHTML(term1))
document.body.appendChild(AlgebraObjectDisplay.getHTML(term2))
document.body.appendChild(AlgebraObjectDisplay.getHTML(term3))

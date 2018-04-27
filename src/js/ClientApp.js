let {AlgebraTerm, AlgebraStatement} = require('./AlgebraObjects.js');
let AlgebraObjectDisplay = require('./AlgebraObjectDisplay.js')
let {AppManager} = require('./AppManager.js');


// create a term
let term1 = AlgebraTerm({ factor: 1, variables:{x:{power:1}} } )
let term2 = AlgebraTerm({ factor: 2, variables:{x:{power:1}} } )
let term3 = AlgebraTerm({ factor: 6, variables:{x:{power:1}} } )

let appManager = AppManager(AlgebraStatement([term1], undefined, 'LHS'), AlgebraStatement([term2, term3], undefined, 'RHS'))

//add the html to the document
/* eslint-disable no-console */
document.body.appendChild(AlgebraObjectDisplay.getHTML(term1, ()=>{appManager.selectTerm(term1)}))
document.body.appendChild(AlgebraObjectDisplay.getHTML(term2, ()=>{appManager.selectTerm(term2)}))
document.body.appendChild(AlgebraObjectDisplay.getHTML(term3, ()=>{appManager.selectTerm(term3)}))

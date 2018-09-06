// something to load JSON file
var AlgebraTerm = require('./AlgebraObjects.js').AlgebraTerm;
var AlgebraStatement = require('./AlgebraObjects.js').AlgebraStatement;

const EquationLoader = function EquationLoader(equationObject){
    
    let equationData = equationObject;
    let currentIndex = Object.keys(equationData).length;

    const getNextEquationJSON = function getNextEquationJSON(){
        let keys = Object.keys(equationData)
        currentIndex = (currentIndex+1 < keys.length) ? currentIndex+1 : 0 // increase the index
        var equationKey = keys[currentIndex];
        
        return equationData[equationKey]
    }

    const getNextEquation = function getNextEquation(){
        let keys = Object.keys(equationData)
        currentIndex = (currentIndex+1 < keys.length) ? currentIndex+1 : 0 // increase the index
        var equationKey = keys[currentIndex];
        
        return JSONtoObjects(equationData[equationKey])
    }

    const JSONtoObjects = function JSONtoObjects(equationJSON){
        return {
            LHS: JSONtoStatement(equationJSON.LHS),
            RHS: JSONtoStatement(equationJSON.RHS)
        }
    }

    const JSONtoStatement = function JSONtoStatement( {terms = [], statements = [], reciprocal = false, multiplyTerm = {}, denominatorTerm = {} } ){
        // statement has terms
        let termObjects = terms.map((termJSON)=>{
            return JSONtoTerm(termJSON)
        })
        
        multiplyTerm = JSONtoTerm(multiplyTerm)
        denominatorTerm = JSONtoTerm(denominatorTerm)

        // create the core statement
        let statement = AlgebraStatement(termObjects, undefined, undefined, reciprocal)
        statement.setMultiplyTerm(multiplyTerm)
        
        // add on the childStatements
        statements.forEach((subStatement)=>{
            statement.addStatement(JSONtoStatement(subStatement))
        })
        
        return statement
    }

    const JSONtoTerm = function JSONtoTerm({ factor, variables}){
        return AlgebraTerm({factor: factor, variables: variables})
    }
    
    return {
        getNextEquationJSON: getNextEquationJSON,
        getNextEquation: getNextEquation,
        JSONtoStatement: JSONtoStatement
    }
}

module.exports = EquationLoader


var Operations = require('./AlgebraObjects.js').TermOperators;

const AppManager = function AppManager(LHStatement, RHStatement){
    var state = {
        selectedTerm: undefined,
        statements: [LHStatement, RHStatement]
    }
    const termSelect = function termSelect(term){ // sets the term to be worked on 
        if(state.selectedTerm == undefined){ // if there isn't already a selected term --- set the term and exit
            state.selectedTerm = term
            return "term set"
        }else{ // do an operation
            return operateOnTerm(getSelectedTerm(), term)
        }
    }

    const operateOnTerm = function opertateOnTerm(term1, term2){
        var operation = undefined
        var result = undefined;
        if(sameStatement(term1, term2)){ // if they are in the same statement
            
            var multiplyTerm = getMultiplyTerm(term1, term2) // this is not picking up multiply

            if(multiplyTerm == undefined){ // -- ADD
                operation = "add";
                result = applyAddOperation(term1, term2)
                placeAddResult(result, term1)//TODO: implement these
                removeAddComponents(term1, term2)
            }else{  // -- MULTIPLY
                operation = "multiply"
                result = applyMultiplyOperation(term1, term2)
                placeMultiplyResult(result, (multiplyTerm != term1) ? term1 : term2 ) // give the one that isn't the multiplyTerm
                removeMultiplyComponents(multiplyTerm, (multiplyTerm != term1) ? term1 : term2 )
            }

        }else{
            operation = "not same statement"
        }

        state.selectedTerm = undefined;
        return {operation: operation , result: result}
    }

    applyAddOperation = function applyAddOperation(term1, term2){
        return Operations.add(term1, term2)
    }
    placeAddResult = function placeAddResult(result, placementTerm){
        var placeLocation = placementTerm.getParent()
        placeLocation.addTerm(result);     // add the result to the statement
        return true
    }
    removeAddComponents = function removeAddComponents(term1, term2){
        var parentStatement = term1.getParent();
        parentStatement.removeTerm(term1);
        parentStatement.removeTerm(term2)
        return true
    }

    applyMultiplyOperation = function applyMultiplyOperation(term1, term2){
        return Operations.multiply(term1, term2)
    }
    placeMultiplyResult = function placeMultiplyResult(multiResult, placementTerm){
        var placeLocation = placementTerm.getParent().getParent()
        placeLocation.addTerm(multiResult) // add the multiplication result outside the bracket
        return true
    }
    removeMultiplyComponents = function removeMultiplyComponents(multiplyTerm, term){ // TODO : work out the removal for nested statements
        var nestedStatement = term.getParent()
        nestedStatement.removeTerm(term)// remove the term we just multiplied
        if(nestedStatement.isEmpty()){ nestedStatement.getParent().removeStatement(nestedStatement) } // remove the statement if its empty
        return true
    }

    const getMultiplyTerm = function getMultiplyTerm(term1, term2){
        var parentStatement = term1.getParent()

        return (parentStatement.isMultiplyTerm(term1)) ? term1 :
                    (parentStatement.isMultiplyTerm(term2) ? term2 : undefined)
    }

    const addStatement = function addStatement(statement){
        state.statements.push(statement)
    }

    const sameStatement = function sameStatement(term1, term2){
        return term1.getParent() == term2.getParent()
    }
    const getSelectedTerm = function getSelectedTerm(){
        return state.selectedTerm
    }

    return Object.create(
        { termSelect: termSelect,
            sameStatement:sameStatement,
            getSelectedTerm: getSelectedTerm
        }
    )
}

module.exports = {
    AppManager: AppManager
}

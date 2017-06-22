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
        if(sameStatement(term1, term2)){ // if they are in the same statement
            
            var multiplyTerm = getMultiplyTerm(term1, term2) // this is not picking up multiply

            if(multiplyTerm == undefined){ // -- ADD
                operation = "add";
                //var result = applyAddOperation(term1, term2)
                //placeAddResult(result, term1)//TODO: implement these
                //removeAddComponents(term1, term2)
            }else{  // -- MULTIPLY
                operation = "multiply"
                //var result = applyMultiplyOperation(term1, term2)
                //placeMultiplyResult(result, (multiplyTerm != term1) ? term1 : term2 )
                //removeMultiplyComponents(term1, term2)
            }

        }else{
            operation = "not same statement"
        }

        state.selectedTerm = undefined;
        return operation
    }

    applyAddOperation = function applyAddOperation(term1, term2){
        return Operations.add(term1, term2)
    }
    placeAddResult = function placeAddResult(result, placementTerm){
        var placeLocation = placementTerm.getParent()
        placeLocation.addTerm(result);     // add the result to the statement
        placeLocation.removeTerm(term);       // remove the terms we added from the term
        placeLocation.removeTeterrm(state.selectedTerm)
        return true
    }
    removeAddComponents = function removeAddComponents(term1, term2){
        var parentStatement = term1.getParent();
        parentStatement.removeTerm(term1);
        parentStatement.removeTerm(term2)
    }

    applyMultiplyOperation = function applyMultiplyOperation(term1, term2){
        return Operations.multiply(term1, term2)
    }
    placeMultiplyResult = function placeMultiplyResult(result, placementTerm){
        var placeLocation = placementTerm.getParent().getParent()
        placeLocation.addTerm(multiResult) // add the multiplication result outside the bracket
        return true
    }
    removeMultiplyComponents = function removeMultiplyComponents(multiplyTerm, term){ // TODO : work out the removal for nested statements

    }

    removeSubstatement = function removeSubStatement(statement){
        if(statement.getParent()){
            //statement.getParent().removeStatement(statement) // TODO : Do we need to remove the statement
        }// else cant remove it if its at the top element
    }

    const getMultiplyTerm = function getMultiplyTerm(term1, term2){
        var factor = undefined;
        state.statements.forEach(function(statement){
            var multiTerm = statement.getMultiplyTerm()
            if (term1 == multiTerm ){ factor = term1; 
            }else if (term2 == multiTerm ){ factor = term2; }
        })
        return factor
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

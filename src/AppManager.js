var Operations = require('./AlgebraObjects.js').TermOperators;

const AppManager = function AppManager(LHStatement, RHStatement){
    var state = {
        selectedTerm: undefined,
        statements: [LHStatement, RHStatement]
    }
    const termSelect = function termSelect(term){ // sets the term to be worked on 
        if(!state.selectedTerm){ // if there isn't already a selected term --- set the term and exit
            state.selectedTerm = term
            return "term set"
        }else{// TODO: check if the next selected term is in the same statement - otherwise alert the user and do nothing

            if(sameStatement(state.selectedTerm, term)){ // if they are in the same statement
                
                var multiplyTerm = getMultiplyTerm(state.selectedTerm, term)

                if(multiplyTerm == undefined){ // -- ADD
                    return "add";
                    /*var parentStatement = term.getParent()
                    var addResult = Operations.add(state.selectedTerm, term)

                    parentStatement.addTerm(addResult);     // add the result to the statement
                    parentStatement.removeTerm(term);       // remove the terms we added from the term
                    parentStatement.removeTerm(state.selectedTerm)
                    return addResult;*/
                }else{  // -- MULTIPLY
                    return "multiply"
                    /*
                    var parentStatement = term.getParent();
                    var multiResult = Operations.multiply(state.selectedTerm, term)
                    console.log(parentStatement)
                    parentStatement.getParent().addTerm(multiResult) // add the multiplication result outside the bracket
                    // remove the term that wasn't the factor
                    // see whether the statement is now empty
                        // if so delete the statement
                        // if NOT - leave the statement in place

                    return multiResult;*/
                }

            }else{
                return "not same statement"
            }

            state.selectedTerm = undefined // whatever the outcome there is nothing selected anymore
        }
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

    const sameStatement = function sameStatement(term1, term2){ // TODO: problem with the tests is here
        return term1.getParent() == term2.getParent()
    }

    return Object.create(
        { termSelect: termSelect
        }
    )
}

module.exports = {
    AppManager: AppManager
}

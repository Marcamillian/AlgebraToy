var Operations = require('./AlgebraObjects.js').TermOperators;
var {AlgebraStatement, AlgebraTerm} = require('./AlgebraObjects.js');


const AppManager = function AppManager(LHStatement, RHStatement){
    var state = {
        selectedTerm: undefined,
        statements: [
            AlgebraStatement([], undefined),
            AlgebraStatement([], undefined)
        ]
    }
    if(LHStatement != undefined) state.statements[0] = LHStatement;
    if(RHStatement != undefined) state.statements[1] = RHStatement;

    const termSelect = function termSelect(term){ // sets the term to be worked on 
        if(state.selectedTerm == undefined || state.selectedTerm == term){ // if there isn't already a selected term --- set the term and exit
            state.selectedTerm = term
            term.setSelected(true)
            term.getParent().setSelected(true)
            return "term set"
        }else{ // do an operation
            term.setSelected(false);
            state.selectedTerm.setSelected(false);
            state.selectedTerm.getParent().setSelected(false);
            term.getParent().setSelected(false);

            try{    // try to carry out the operation
                return operateOnTerm(getSelectedTerm(), term)
            }catch(err){    // catch anything that might happen
                console.error(err)
            }
        }
    }

    const operateOnTerm = function opertateOnTerm(term1, term2){
        var operation = undefined
        var result = undefined;

        if(sameStatement(term1, term2)){ // if they are in the same statement
            
            var multiplyTerm = getMultiplyTerm(term1, term2)
            var denominatorTerm = getDenominatorTerm(term1, term2)


            if(multiplyTerm == undefined){ // -- ADD
                operation = "add";
                try{
                    result = applyAddOperation(term1, term2)
                    placeAddResult(result, term1)
                    removeAddComponents(term1, term2)
                }catch(e){
                    if(/Terms cancelled each other/i.test(e.message)){
                        let sharedParent = term1.getParent();
                        //placeAddResult(AlgebraTerm({factor:0}), term1)
                        removeAddComponents(term1, term2)
                    }else{ // if its not the error we were looking for - throw it up the chain
                        throw e
                    }
                }
                
            }else if(denominatorTerm){
                // -- DIVIDE
                operation = "divide";
                console.log("I'm dividing something")
            }else{  // -- MULTIPLY
                operation = "multiply"
                result = applyMultiplyOperation(term1, term2)
                placeMultiplyResult(result, (multiplyTerm != term1) ? term1 : term2 ) // give the one that isn't the multiplyTerm
                removeMultiplyComponents(multiplyTerm, (multiplyTerm != term1) ? term1 : term2 )
            }

            // check to see if the parent statement is now empty
            console.log(term1.getParent())


        }else{
            operation = "not same statement"
        }

        state.selectedTerm = undefined;
        return {operation: operation , result: result}
    }

    const applyAddOperation = function applyAddOperation(term1, term2){
        return Operations.add(term1, term2)
    }
    const placeAddResult = function placeAddResult(result, placementTerm){
        var placeLocation = placementTerm.getParent()
        placeLocation.addTerm(result);     // add the result to the statement
        return true
    }
    const removeAddComponents = function removeAddComponents(term1, term2){
        var parentStatement = term1.getParent();
        parentStatement.removeTerm(term1);
        parentStatement.removeTerm(term2);
        return true
    }

    const applyMultiplyOperation = function applyMultiplyOperation(term1, term2){
        return Operations.multiply(term1, term2)
    }
    const placeMultiplyResult = function placeMultiplyResult(multiResult, placementTerm){
        var placeLocation = placementTerm.getParent().getParent()
        placeLocation.addTerm(multiResult) // add the multiplication result outside the bracket
        return true
    }
    const removeMultiplyComponents = function removeMultiplyComponents(multiplyTerm, term){ // TODO : work out the removal for nested statements
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

    const getDenominatorTerm = function getDenominatorTerm(term1, term2){
        var parentStatement = term1.getParent();
        return parentStatement.isDenominatorTerm(term1)
                ? term1
                : parentStatement.isDenominatorTerm(term2)
                    ? term2
                    : undefined
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

    const getStatement = function getStatement(side){
        return (side == 'LHS') ? state.statements[0] : state.statements[1]
    }

    const getStatements = function getStatements(){
        return state.statements
    }

    const introduceTerm = function itroduceTerm(operation,term){
        
        switch (operation){
            case "add":
                state.statements.forEach((statement)=>{
                    let termCopy = Operations.duplicateTerm(term);
                    statement.addTerm(termCopy)
                })
            break;
            case "multiply":
                state.statements.forEach((statement, index)=>{
                    let termCopy = Operations.duplicateTerm(term);
                    let outsideTerm = AlgebraStatement();
                    outsideTerm.addStatement(statement.multiplyStatement(termCopy))
                    state.statements[index] = outsideTerm
                })
            break;
            case "divide":
            break
            default:
                throw new Error("define an operation")
            break
        }
        
    }

    return Object.create(
        { termSelect: termSelect,
            sameStatement:sameStatement,
            getSelectedTerm: getSelectedTerm,
            getStatement: getStatement,
            getStatements: getStatements,
            introduceTerm: introduceTerm
        }
    )
}

module.exports = {
    AppManager: AppManager
}

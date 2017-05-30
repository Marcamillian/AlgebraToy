const AppManager = function AppManager(){
    var state = {
        operation: "add",
        selectedTerm: undefined
    }
    const termSelect = function termSelect(term){
        if(!state.selectedTerm){
            state.selectedTerm = term
        }else{
            console.log(AlgebraObjects.TermOperators.add(state.selectedTerm, term))
            state.selectedTerm = undefined;
        }
    }
    
    return Object.create(
        { termSelect: termSelect
        }
    )
}

module.exports = {
    AppManager: AppManager
}

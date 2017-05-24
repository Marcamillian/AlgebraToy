const AlgebraTerm = function AlgebraTerm(_arguments){
    var state = {
        positive: true,
        factor: 1,
        variables: {}
    }
    const init = function init(termValues){
        state.positive = (termValues != undefined && termValues.positive !=undefined) ? termValues.positive : true;
        state.factor = (termValues != undefined && termValues.factor != undefined) ? termValues.factor:  1;

        if (termValues != undefined && termValues.variables){
            Object.keys(termValues.variables).forEach(function(variableName){
                state.variables[variableName] = {power: (termValues.variables[variableName].power == undefined)? 1 // account fot the fact that power might not have been stated
                                                            : termValues.variables[variableName].power };
            })
        }
    }
    const getState = function getState(){
        return state
    }
   
    // make the state
    init(_arguments);

    return Object.assign(
        {getState: getState}
    )
}

module.exports = {
    AlgebraTerm: AlgebraTerm
}
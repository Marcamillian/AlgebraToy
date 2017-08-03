// something to load JSON file
var equationData = require('./EquationSetups.json')


const EquationLoader = function EquationLoader(){
    
    let currentIndex = Object.keys(equationData).length;

    const getNextEquation = function getNextEquation(){
        let keys = Object.keys(equationData)
        currentIndex = (currentIndex+1 < keys.length) ? currentIndex+1 : 0 // increase the index
        var equationKey = keys[currentIndex];
        return equationData[equationKey]
    }
    
    return {
        getNextEquation: getNextEquation
    }
}

module.exports = EquationLoader


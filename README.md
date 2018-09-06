# AlgebraToy

Web app to enourage people to play with the decision making in algebra without worrying about getting the calculation wrong.

:warning:  In its current state there is minimal styling as the focus has been the business logic.


### Design Notes
- Vanilla Javascript
- Custom MVC architecture
- Gulp build scripts (using broswerify) to product distribution build
- Unit testing with [tape](https://www.npmjs.com/package/tape)
- CommonJS modules
- Factory functions using private state

## Installation 

### Dependancies
- [Node.js](https://nodejs.org/en/) 
- npm

### Running the app

- Clone the repository
- Navigate to the project directory in the command line
- Run `npm install`
- Run `gulp serve`


The app is now running on [localhost:8080](http://localhost:8080)


## Implementation Notes

 The app is set up with a rough MVC architecture with the clientApp serving as the entry point

- Client App module - container for the rest of the app - (**Controller**)
  - AppManager - module to handle all business logic relating to equation calculation (**Model**)
  - AlgebraObjectDisplay - module to turn model into HTML (**display**)
  - EquationLoader - module to load the pre-defined equations (currently form a JSON file)
  - TermCreator - module to create new terms for insertion into the current equation



Factory funtions to create the model objects are contained within the AlgebraObjects module.



### Term Object

The base unit of the equation is a term e.g. 2x^2 or 2x^2y^4

The factory produces an object with the following internal state
```
{
  factor: <Number>,
  variables: <Object> in the format {<varibleName>:{power:<Number>} } // e.g. {x:{power:2}, y:{power:4}}
  parent: <Element> // reference to the parent statement
  isSelected: <Boolean> - // flag to record if the term is selected
}
```

State is exposed and modified with a collection of get and set fuctions on the object



### Statement Object

A collection of terms recording the relationship between the terms. These statements may be nested.

e.g. Non-nested
``5(2x^2 -2y^2)``

Nested
```
2( 2x + 5(2x^2 - 2y^2)  )
^       ^           ^   ^
|       |   Nested  |   |
|                       |
|    Outer  Statement   |
```

The factory produces a statement with the following internal state
```
{
  multiTerm: <AlgebraTerm> // Term that the whole statement is multiplied by (term outside of the brackets)
  terms: [<AlgebraTerm>] // array of term objects
  statements: [<AlgebraStatement>] // array of any nested statements
  parent: <Element> // reference to parent statement
  isSelected: <Boolean> // flag to indicate if the statement is selected
}
```
State is exposed and modified with a collection of get and set methods on the object



### TermOperators
Object containing a collection of pure functions for performing operations between two functions e.g. addition/multiplication etc. and comparisons between term objects and dulpicating term objects.




### AppManager
Module for both storing and handelling the interation between statements and terms


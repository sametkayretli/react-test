import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons: [
      { id: '000', name: 'Max', age: 28 },
      { id: '001', name: 'Manu', age: 29 },
      { id: '002', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  };


  nameChangedHandler = (event, id)=> {
    //find the index of the person of will manipulated
    const personIndex = this.state.persons.findIndex(
      personIdx => {
        return personIdx.id === id;
      }
    );
    
    // create a clone that selected person, because objects are reference type
    // you do not want to mutate them
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    // create a clone the persons array
    const persons = [...this.state.persons];
    // swap the updated person with older one
    persons[personIndex] = person;

    // set the state of persons array to updated persons array
    this.setState({ persons: persons});
  };

  deletePersonHandler = (personIndex) => {

    // clone the persons array
    const persons = [...this.state.persons];

    //displaying index and id info in console
    console.log("index: "+personIndex);
    console.log("id: "+persons[personIndex].id);

    // delete the person element which pointed with its index
    persons.splice(personIndex, 1);

    // set the state with the updated persons array
    this.setState({persons: persons});
  };

  togglePersonsHandler = () => {

    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  };


  render() {

    // Styling inline for button without css file
    // Not neccessary to use const name 'style', it could be any name!!
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid light-blue',
      padding: '8px',
      cursor: 'pointer'
    };

    // if the showPersons is false then display nothing
    let persons = null;
    
    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map(
            (person, index) =>{
              return <Person
                click={() => this.deletePersonHandler(index)} 
                name={person.name} 
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)} />
            }
          )}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button 
          onClick={this.togglePersonsHandler}
          style={style}
        >
          Show/Hide Names
        </button>
        {persons}
      </div>
    );

    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;

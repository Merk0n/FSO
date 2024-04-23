import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import RenderPeople from './components/RenderPeople';

function App() {
  const [person, setPerson] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPeople, setFilteredPeople] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      id: person.length + 1,
      name: newName,
      number: newNumber,
    };
    {
      personObject.name === ''
        ? alert('Please enter a name')
        : person.find((p) => p.name === newName)
        ? alert(`${newName} is already added to phonebook`)
        : setPerson(person.concat(personObject));
    }

    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilteredPeople = person.filter((person) =>
    person.name.toLowerCase().includes(filteredPeople.toLowerCase())
  );

  return (
    <>
      <h2>Phonebook</h2>
      <Filter onFiltered={filteredPeople} onSetFiltered={setFilteredPeople} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <RenderPeople handleFilteredPeople={handleFilteredPeople} />
    </>
  );
}

export default App;

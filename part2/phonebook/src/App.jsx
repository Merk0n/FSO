import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import RenderPeople from './components/RenderPeople';
import personService from './services/person';

function App() {
  const [person, setPerson] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPeople, setFilteredPeople] = useState('');

  useEffect(() => {
    personService.getAll().then((initialPerson) => {
      setPerson(initialPerson);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: person.length + 1,
    };

    {
      (personObject.name && personObject.number) === ''
        ? alert('Please enter a name and number')
        : person.find((p) => p.name === newName)
        ? alert(`${newName} is already added to phonebook`)
        : personService.create(personObject).then((returnedPerson) => {
            setPerson(person.concat(returnedPerson));
          });
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

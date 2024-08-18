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
    };

    {
      (personObject.name && personObject.number) === ''
        ? alert('Please enter a name and number')
        : person.find((p) => p.name === newName)
        ? confirm(
            `${newName} is already added to phonebook. Replace the old number with a new one?`
          )
          ? personService
              .update(person.find((p) => p.name === newName).id, personObject)
              .then((returnedPerson) => {
                setPerson(
                  person.map((p) =>
                    p.id !== returnedPerson.id ? p : returnedPerson
                  )
                );
              })
          : console.log('Cancelled')
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

  const deletePerson = (id) => {
    personService
      .remove(id)
      .then(() => {
        setPerson(person.filter((person) => person.id !== id));
      })
      .catch((error) => {
        console.log(error.message);
        alert('The person was already deleted from the server');
      });
  };

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
      <RenderPeople
        deletePerson={deletePerson}
        handleFilteredPeople={handleFilteredPeople}
      />
    </>
  );
}

export default App;

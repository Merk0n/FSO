import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import RenderPeople from './components/RenderPeople';
import personService from './services/person';
import Notification from './components/Notification';
import './index.css';

function App() {
  const [person, setPerson] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPeople, setFilteredPeople] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
                setMessage(`Updated ${newName}`);
                setTimeout(() => {
                  setMessage(null);
                }, 5000);
              })
          : console.log('Cancelled')
        : personService.create(personObject).then((returnedPerson) => {
            setPerson(person.concat(returnedPerson));
            setMessage(`Added ${newName}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
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
      .catch(() => {
        setErrorMessage(
          `Information of ${
            person.find((p) => p.id === id).name
          } has already been removed from the server`
        );
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
      <Notification message={message} />

      <h2>Numbers</h2>
      <RenderPeople
        deletePerson={deletePerson}
        handleFilteredPeople={handleFilteredPeople}
      />
      <Notification message={errorMessage} />
    </>
  );
}

export default App;

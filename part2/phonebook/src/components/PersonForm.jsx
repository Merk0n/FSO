const PersonForm = ({
  addPerson,
  handleNameChange,
  newName,
  handleNumberChange,
  newNumber,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input required onChange={handleNameChange} value={newName} />{' '}
        <br />
        number:{' '}
        <input required onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;

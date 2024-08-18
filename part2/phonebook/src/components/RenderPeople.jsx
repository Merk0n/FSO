import Person from './Person';

const RenderPeople = ({ handleFilteredPeople, deletePerson }) => {
  return (
    <ul>
      {handleFilteredPeople.map((person) => (
        <Person deletePerson={deletePerson} key={person.id} person={person} />
      ))}
    </ul>
  );
};

export default RenderPeople;

import Person from './Person';

const RenderPeople = ({ handleFilteredPeople }) => {
  return (
    <ul>
      {handleFilteredPeople.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </ul>
  );
};

export default RenderPeople;

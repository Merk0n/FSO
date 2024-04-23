const TotalExercises = ({ course }) => {
  return (
    <p>
      Number of exercises{' '}
      {course.parts.reduce(
        (accumulator, partValue) => accumulator + partValue.exercises,
        0
      )}
    </p>
  );
};

export default TotalExercises;

import Header from './components/Header';
import Content from './components/Content';
import TotalExercises from './components/TotalExercises';

const CourseInformation = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <TotalExercises course={course} />
    </>
  );
};

export default CourseInformation;

import { useState } from 'react';
import Button from './Button';
import Statistics from './Statistics';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h2>give feedback</h2>
      <Button onSubmit={() => setGood(good + 1)}>good</Button>
      <Button onSubmit={() => setNeutral(neutral + 1)}>neutral</Button>
      <Button onSubmit={() => setBad(bad + 1)}>bad</Button>

      <Statistics onGood={good} onNeutral={neutral} onBad={bad} />
    </>
  );
}

export default App;

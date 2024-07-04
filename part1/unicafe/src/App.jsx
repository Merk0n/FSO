import { useState } from 'react';
import Button from './Button';
import Statistics from './Statistics';

function App() {
  const [points, setPoints] = useState([
    { name: 'good', value: 0 },
    { name: 'neutral', value: 0 },
    { name: 'bad', value: 0 },
  ]);

  const addGood = () => {
    const newPoints = points.map((point) =>
      point.name === 'good' ? { ...point, value: point.value + 1 } : point
    );
    setPoints(newPoints);
  };

  const addNeutral = () => {
    const newPoints = points.map((point) =>
      point.name === 'neutral' ? { ...point, value: point.value + 1 } : point
    );
    setPoints(newPoints);
  };

  const addBad = () => {
    const newPoints = points.map((point) =>
      point.name === 'bad' ? { ...point, value: point.value + 1 } : point
    );
    setPoints(newPoints);
  };

  return (
    <>
      <h2>give feedback</h2>
      <Button onSubmit={addGood}>good</Button>
      <Button onSubmit={addNeutral}>neutral</Button>
      <Button onSubmit={addBad}>bad</Button>

      <Statistics
        onGood={points.find((point) => point.name === 'good').value}
        onNeutral={points.find((point) => point.name === 'neutral').value}
        onBad={points.find((point) => point.name === 'bad').value}
      />
    </>
  );
}

export default App;

import { useState } from 'react';
import Button from './Button';
import Statistics from './Statistics';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [selected, setSelected] = useState(0);

  const getRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ];

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const getVotes = () => {
    const copy = [...votes];
    copy[selected] += 1;
    return setVotes(copy);
  };

  return (
    <>
      <h2>give feedback</h2>
      <Button onSubmit={() => setGood(good + 1)}>good</Button>
      <Button onSubmit={() => setNeutral(neutral + 1)}>neutral</Button>
      <Button onSubmit={() => setBad(bad + 1)}>bad</Button>

      <Statistics onGood={good} onNeutral={neutral} onBad={bad} />

      <h2>anecdotes</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onSubmit={getVotes}>vote</Button>
      <Button onSubmit={getRandomAnecdote}>next anecdote</Button>

      <h2>anecdote with most votes</h2>
      {votes.every((vote) => vote === 0) ? (
        <p>No votes yet</p>
      ) : (
        <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      )}
    </>
  );
}

export default App;

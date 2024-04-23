import StatisticLine from './StatisticLine';

const Statistics = ({ onGood, onNeutral, onBad }) => {
  return (
    <>
      <h2>statistics</h2>
      {onGood + onNeutral + onBad === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text='good' value={onGood} />

            <StatisticLine text='neutral' value={onNeutral} />

            <StatisticLine text='bad' value={onBad} />

            <StatisticLine text='all' value={onGood + onNeutral + onBad} />

            <StatisticLine
              text='average'
              value={(onGood - onBad) / (onGood + onNeutral + onBad)}
            />
            <StatisticLine
              text='positive'
              value={(onGood / (onGood + onNeutral + onBad)) * 100 + ' %'}
            />
          </tbody>
        </table>
      )}
    </>
  );
};

export default Statistics;

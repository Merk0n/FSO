const Filter = ({ onFiltered, onSetFiltered }) => {
  return (
    <div>
      filter shown with
      <input
        value={onFiltered}
        onChange={(e) => onSetFiltered(e.target.value)}
      />
    </div>
  );
};

export default Filter;

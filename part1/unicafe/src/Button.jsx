const Button = ({ onSubmit, children }) => {
  return <button onClick={onSubmit}>{children}</button>;
};

export default Button;

const OutputBox = ({ output }) => {
  return (
    <div className="output-container">
      <h3>Output:</h3>
      <pre>{output}</pre>
    </div>
  );
};

export default OutputBox;

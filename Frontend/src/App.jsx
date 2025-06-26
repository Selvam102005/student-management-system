import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import OutputBox from './components/OutputBox';
import './App.css';

function App() {
  const [output, setOutput] = useState("");

  const displayOutput = (message) => {
    setOutput(typeof message === 'string' ? message : JSON.stringify(message, null, 2));
  };

  return (
    <div className="app-container">
      <div className="left-panel">
        <h2>Student Management</h2>
        <StudentForm displayOutput={displayOutput} />
      </div>
      <div className="right-panel">
        <OutputBox output={output} />
      </div>
    </div>
  );
}

export default App;

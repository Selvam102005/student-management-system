import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import OutputBox from './components/OutputBox';
import axios from 'axios';
import './App.css';

function App() {
  const [output, setOutput] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const displayOutput = (message) => {
  if (typeof message === 'object') {
    setOutput(message);
  } else {
    setOutput(message.toString());
  }
};


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { username, password });

      setMessage(res.data.message);
      if (res.data.success) {
        setLoggedIn(true);
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  if (!loggedIn) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
        >
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ margin: "10px 0", padding: "10px" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ margin: "10px 0", padding: "10px" }}
          />
          <button type="submit" style={{ padding: "10px" }}>
            Login
          </button>
          {message && <p style={{ marginTop: "10px" }}>{message}</p>}
        </form>
      </div>
    );
  }


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

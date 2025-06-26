import { useState } from 'react';

function calculateGrade(marks) {
  if (marks >= 90) return 10;
  if (marks >= 80) return 9;
  if (marks >= 70) return 8;
  if (marks >= 60) return 7;
  if (marks >= 50) return 6;
  if (marks >= 40) return 5;
  return 4;
}

const FancyButton = ({ label, onClick }) => (
  <button onClick={onClick}>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span>{label}</span>
  </button>
);

const StudentForm = ({ displayOutput }) => {
  const [form, setForm] = useState({
    id: '', name: '', mark1: '', mark2: '', mark3: '', deleteId: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const insertStudent = async () => {
    const { id, name, mark1, mark2, mark3 } = form;
    if (!id || !name || !mark1 || !mark2 || !mark3) {
      displayOutput("Please provide all fields.");
      return;
    }

    const grade1 = calculateGrade(Number(mark1));
    const grade2 = calculateGrade(Number(mark2));
    const grade3 = calculateGrade(Number(mark3));
    const cgpa = ((grade1 + grade2 + grade3) / 3).toFixed(2);

    try {
      const res = await fetch('http://localhost:5000/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, mark1, mark2, mark3, cgpa })
      });
      const data = await res.json();
      displayOutput(data.message || data.error);
    } catch (err) {
      displayOutput("Error: " + err.message);
    }
  };

  const deleteStudent = async () => {
    if (!form.deleteId) {
      displayOutput("Please provide a Student ID to delete.");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: form.deleteId })
      });
      const data = await res.json();
      displayOutput(data.message || data.error);
    } catch (err) {
      displayOutput("Error: " + err.message);
    }
  };

  const fetchStudents = async (table) => {
    try {
      const res = await fetch(`http://localhost:5000/fetch?table=${table}`);
      const data = await res.json();
      displayOutput(data);
    } catch (err) {
      displayOutput("Error: " + err.message);
    }
  };

  const handleTransaction = async (action) => {
    try {
      const res = await fetch(`http://localhost:5000/${action}`, {
        method: 'POST',
      });
      const data = await res.json();
      displayOutput(data.message || data.error);
    } catch (err) {
      displayOutput("Error: " + err.message);
    }
  };

  return (
    <>
      <div className="form-group">
        <input type="text" id="id" value={form.id} onChange={handleChange} required />
        <label htmlFor="id">Student ID</label>
      </div>
      <div className="form-group">
        <input type="text" id="name" value={form.name} onChange={handleChange} required />
        <label htmlFor="name">Student Name</label>
      </div>
      <div className="form-group">
        <input type="number" id="mark1" value={form.mark1} onChange={handleChange} required />
        <label htmlFor="mark1">Marks for Subject 1</label>
      </div>
      <div className="form-group">
        <input type="number" id="mark2" value={form.mark2} onChange={handleChange} required />
        <label htmlFor="mark2">Marks for Subject 2</label>
      </div>
      <div className="form-group">
        <input type="number" id="mark3" value={form.mark3} onChange={handleChange} required />
        <label htmlFor="mark3">Marks for Subject 3</label>
      </div>

      <div className="button-group">
        <FancyButton label="Insert Student" onClick={insertStudent} />
        <FancyButton label="Show Students" onClick={() => fetchStudents("student")} />
        <FancyButton label="Show Lateral Students" onClick={() => fetchStudents("student_lateral")} />
      </div>

      <div className="button-group">
        <FancyButton label="Commit" onClick={() => handleTransaction("commit")} />
        <FancyButton label="Rollback" onClick={() => handleTransaction("rollback")} />
      </div>

      <div className="form-group">
        <input type="text" id="deleteId" value={form.deleteId} onChange={handleChange} required />
        <label htmlFor="deleteId">Delete Student by ID</label>
      </div>
      <FancyButton label="Delete Student" onClick={deleteStudent} />
    </>
  );
};

export default StudentForm;

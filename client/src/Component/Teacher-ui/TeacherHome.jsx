import React, { useEffect, useState } from "react";
import { getSubjects, addSubject } from "../../api/subjectApi";
import { logoutTeacher } from "../../auth/teacherAuth";

function TeacherHome() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    loadSubjects();
  }, []);

  async function loadSubjects() {
    const res = await getSubjects();
    if (res.data) setSubjects(res.data);
  }

  async function handleAdd() {
    if (!name || !code) return alert("fill all fields");

    await addSubject(name, code);
    setName("");
    setCode("");
    loadSubjects();
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Teacher Dashboard</h2>

      <button onClick={logoutTeacher}>Logout</button>

      <h3>Add Subject</h3>
      <input
        placeholder="Subject Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="Subject Code"
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <h3>Your Subjects</h3>
      {subjects.map(s => (
        <div key={s.id}>
          {s.subject_name} ({s.subject_code})
        </div>
      ))}
    </div>
  );
}

export default TeacherHome;
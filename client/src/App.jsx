import { Routes, Route, useLocation } from "react-router-dom";

import TeacherLogin from "./Components/teacherui/TeacherLogin";
import TeacherHome from "./Components/teacherui/TeacherHome";
import CreateExam from "./Components/teacherui/CreateExam";
import TeacherNavbar from "./Components/teacherui/TeacherNavbar";
import CreateClass from "./Components/teacherui/CreateClass";
import Exams from "./Components/teacherui/Exams";

function App() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <TeacherNavbar />}

      <Routes>
        <Route path="/" element={<TeacherLogin />} />
        <Route path="/TeacherHome" element={<TeacherHome />} />
        <Route path="/CreateExam" element={<CreateExam />} />
        <Route path="/CreateClass" element={<CreateClass/>} />
        <Route path="/Exams" element={<Exams/>}/>
      </Routes>
    </>
  );
}

export default App;
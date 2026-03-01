import { BrowserRouter, Routes, Route } from "react-router-dom";

import TeacherHome from "./Component/teacherui/TeacherHome";
import Classes from "./Component/teacherui/Classes";
import CreateClass from "./Component/teacherui/CreateClass";
import CreateExam from "./Component/teacherui/CreateExam";
import Exams from "./Component/teacherui/Exams";
import EditExam from "./Component/teacherui/EditExam";
import AddQuestion from "./Component/teacherui/AddQuestion"; 
import EditClass from "./Component/teacherui/EditClass";

function App() {
  return (
    <>
      <Routes>
        <Route path="/TeacherHome" element={<TeacherHome />} />
        <Route path="/Classes" element={<Classes />} />
        <Route path="/CreateClass" element={<CreateClass />} />
        <Route path="/edit-class/:id" element={<EditClass />} />
        <Route path="/CreateExam" element={<CreateExam />} />
        <Route path="/Exams" element={<Exams />} />
        <Route path="/edit-exam/:id" element={<EditExam />} />
        <Route path="/add-question/:examId" element={<AddQuestion />} />
        <Route path="/edit-class/:id" element={<EditClass />} />
      </Routes>
      </>

  );
}

export default App;
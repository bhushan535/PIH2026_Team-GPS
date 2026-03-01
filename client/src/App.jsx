import { Routes, Route } from "react-router-dom";

import HomePage from "./Component/HomePage.jsx";
import AuthCallback from "./Component/Common/AuthCallback.jsx";
import StudentLogin from "./Component/Student-UI/StudentLogin.jsx";
import StudentDashboard from "./Component/Student-UI/StudentDashboard.jsx";

import TeacherOptions from "./Component/Teacher-ui/TeacherOption.jsx";
import TeacherRegister from "./Component/Teacher-ui/TeacherRegister.jsx";
import TeacherLogin from "./Component/Teacher-ui/TeacherLogin.jsx";
import TeacherHome from "./Component/Teacher-ui/TeacherHome.jsx";
import Exams from "./Component/Teacher-ui/Exams.jsx";
import CreateExam from "./Component/Teacher-ui/CreateExam.jsx";
import AddQuestion from "./Component/Teacher-ui/AddQuestion.jsx";
import EditExam from "./Component/Teacher-ui/EditExam.jsx";
import TeacherLayout from "./Component/Teacher-ui/TeacherLayout.jsx";
import ExamResults from "./Component/Teacher-ui/ExamResults.jsx";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/auth-callback" element={<AuthCallback />} />
      {/* Student Routes */}
      {/* Student */}
      <Route path="/StudentLogin" element={<StudentLogin />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />

      {/* Teacher Layout */}
      <Route element={<TeacherLayout />}>
        <Route path="/TeacherHome" element={<TeacherHome />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/create-exam" element={<CreateExam />} />
        <Route path="/add-question/:examId" element={<AddQuestion />} />
        <Route path="/edit-exam/:id" element={<EditExam />} />
        <Route path="/results/:examId" element={<ExamResults />} />
      </Route>

      {/* Teacher Auth Pages */}
      <Route path="/teacher" element={<TeacherOptions />} />
      <Route path="/TeacherRegister" element={<TeacherRegister />} />
      <Route path="/TeacherLogin" element={<TeacherLogin />} />

    </Routes>
 
  );
}

export default App;
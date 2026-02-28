import { Routes, Route } from "react-router-dom";

import HomePage from "./Component/Common/HomePage.jsx";
import StudentLogin from "./Component/Student-UI/StudentLogin.jsx";
import StudentDashboard from "./Component/Student-UI/StudentDashboard.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/StudentLogin" element={<StudentLogin />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
    </Routes>
  );
}

export default App;
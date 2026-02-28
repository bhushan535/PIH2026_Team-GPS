
import { BrowserRouter } from "react-router-dom";
import HomePage from "./Component/Common/HomePage.jsx";
import TeacherHome from "./Components/teacherui/TeacherHome";

function App() {
  return (
    <BrowserRouter>
      <HomePage />
      <TeacherHome />
    </BrowserRouter>
  );
}

export default App;


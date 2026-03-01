import { Outlet } from "react-router-dom";
import TeacherNavbar from "./TeacherNavbar";

function TeacherLayout() {
  return (
    <>
      <TeacherNavbar />
      <Outlet />
    </>
  );
}

export default TeacherLayout;
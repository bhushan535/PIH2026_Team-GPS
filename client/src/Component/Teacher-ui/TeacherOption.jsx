import React from "react";
import { Link } from "react-router-dom";

function TeacherOptions() {
  return (
    <div style={{display:"flex",height:"100vh",justifyContent:"center",alignItems:"center"}}>
      <div style={{textAlign:"center"}}>
        <h2>Teacher Panel</h2>
        <p>Select an option</p>

        <div style={{marginTop:20}}>
          <Link to="/TeacherRegister">
            <button style={{margin:10}}>Register</button>
          </Link>

          <Link to="/TeacherLogin">
            <button style={{margin:10}}>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TeacherOptions;
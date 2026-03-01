import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {

    const getSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        navigate("/TeacherHome");
      } else {
        navigate("/TeacherLogin");
      }
    };

    getSession();

  }, []);

  return (
    <div style={{
      color:"white",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh"
    }}>
      Verifying email...
    </div>
  );
}

export default AuthCallback;
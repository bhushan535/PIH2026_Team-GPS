import { supabase } from "../lib/supabase";


// REGISTER
export async function registerTeacher(email, password, name) {

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options:{
      emailRedirectTo: "http://localhost:5173/auth/callback"
    }
  });

  if (error) return { success:false, message:error.message };

  await supabase.from("teachers").insert({
    id: data.user.id,
    email,
    name
  });

  return { success:true, message:"Verify email then login" };
}



// SEND OTP LOGIN
export async function sendLoginOTP(email) {

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options:{ shouldCreateUser:false }
  });

  if (error) return { success:false, message:error.message };

  return { success:true };
}



// VERIFY OTP
export async function verifyLoginOTP(email, otp) {

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email"
  });

  if (error) return { success:false, message:"Wrong OTP" };

  return { success:true, user:data.user };
}



// SESSION CHECK
export async function getCurrentTeacher() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
}



// LOGOUT
export async function logoutTeacher() {
  await supabase.auth.signOut();
}
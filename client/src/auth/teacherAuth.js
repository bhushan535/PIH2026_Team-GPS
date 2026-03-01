import { supabase } from "../lib/supabase";


/* ================= REGISTER ================= */
export async function registerTeacher(email, password, name) {

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: undefined   //stop email confirmation
    }
  });

  if (error) return { success:false, message:error.message };

  // create teacher profile manually
  await supabase.from("teachers").insert({
    id: data.user.id,
    email,
    name
  });

  return { success:true, message:"Account created. Now login using OTP." };
}



/* ================= SEND OTP LOGIN ================= */
export async function sendLoginOTP(email) {

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options:{
      shouldCreateUser:false   // only login allowed
    }
  });

  if (error) return { success:false, message:error.message };

  return { success:true };
}



/* ================= VERIFY OTP ================= */
export async function verifyLoginOTP(email, otp) {

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email"
  });

  if (error) return { success:false, message:"Invalid OTP" };

  return { success:true, user:data.user };
}



/* ================= GET CURRENT USER ================= */
export async function getCurrentTeacher() {
  const { data } = await supabase.auth.getUser(); // ✅ correct
  return data.user ?? null;
}



/* ================= LOGOUT ================= */
export async function logoutTeacher() {
  await supabase.auth.signOut();
}
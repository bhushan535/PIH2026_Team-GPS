import { supabase } from "../lib/supabase";

// get subjects of logged teacher
export async function getSubjects() {
  const { data: userData } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .eq("teacher_id", userData.user.id);

  return { data, error };
}

// add subject
export async function addSubject(name, code) {
  const { data: userData } = await supabase.auth.getUser();

  const { error } = await supabase.from("subjects").insert({
    teacher_id: userData.user.id,
    subject_name: name,
    subject_code: code
  });

  return { success: !error, error };
}
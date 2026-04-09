import { supabase } from "./supabase";

// ── Auth ──────────────────────────────────────────────
export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};

export const signOut = async () => {
  await supabase.auth.signOut();
};

// ── Safe Space Posts ──────────────────────────────────
export const fetchPosts = async (category?: string) => {
  let query = supabase.from("posts").select("*").order("created_at", { ascending: false });
  if (category && category !== "All") query = query.eq("category", category);
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const createPost = async (category: string, content: string) => {
  const { data, error } = await supabase.from("posts").insert({ category, content }).select().single();
  if (error) throw error;
  return data;
};

export const heartPost = async (id: number, currentHearts: number) => {
  const { error } = await supabase.from("posts").update({ hearts: currentHearts + 1 }).eq("id", id);
  if (error) throw error;
};

// ── Messages ──────────────────────────────────────────
export const fetchMessages = async (roomId: string) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("room_id", roomId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
};

export const sendMessage = async (roomId: string, senderId: string, content: string, type = "text", fileUrl?: string) => {
  const { data, error } = await supabase
    .from("messages")
    .insert({ room_id: roomId, sender_id: senderId, content, type, file_url: fileUrl ?? null })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const subscribeToMessages = (roomId: string, callback: (msg: any) => void) => {
  return supabase
    .channel(`messages:${roomId}`)
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `room_id=eq.${roomId}` }, (payload) => {
      callback(payload.new);
    })
    .subscribe();
};

// ── Event Registrations ───────────────────────────────
export const registerForEvent = async (eventId: string, name: string, email: string) => {
  const { data, error } = await supabase
    .from("event_registrations")
    .insert({ event_id: eventId, name, email })
    .select()
    .single();
  if (error) throw error;
  return data;
};

// ── Saved Jobs ────────────────────────────────────────
export const saveJob = async (userId: string, jobId: number, jobData: object) => {
  const { error } = await supabase.from("saved_jobs").insert({ user_id: userId, job_id: jobId, job_data: jobData });
  if (error) throw error;
};

export const fetchSavedJobs = async (userId: string) => {
  const { data, error } = await supabase.from("saved_jobs").select("*").eq("user_id", userId).order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const deleteSavedJob = async (userId: string, jobId: number) => {
  const { error } = await supabase.from("saved_jobs").delete().eq("user_id", userId).eq("job_id", jobId);
  if (error) throw error;
};

// ── File Upload ───────────────────────────────────────
export const uploadFile = async (file: File, bucket = "chat-files") => {
  const path = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; name: string; email: string; avatar_url: string | null; created_at: string };
        Insert: { id: string; name: string; email: string; avatar_url?: string };
        Update: { name?: string; avatar_url?: string };
      };
      posts: {
        Row: { id: number; category: string; content: string; replies: number; hearts: number; created_at: string };
        Insert: { category: string; content: string };
        Update: { hearts?: number; replies?: number };
      };
      messages: {
        Row: { id: number; room_id: string; sender_id: string; content: string; type: string; file_url: string | null; created_at: string };
        Insert: { room_id: string; sender_id: string; content: string; type?: string; file_url?: string };
        Update: never;
      };
      event_registrations: {
        Row: { id: number; event_id: string; name: string; email: string; created_at: string };
        Insert: { event_id: string; name: string; email: string };
        Update: never;
      };
      saved_jobs: {
        Row: { id: number; user_id: string; job_id: number; job_data: object; created_at: string };
        Insert: { user_id: string; job_id: number; job_data: object };
        Update: never;
      };
    };
  };
};

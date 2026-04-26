import "server-only";
import { createServiceClient } from "@/lib/supabase/server";
import type { CreateMessageInput, Message } from "./types";

export async function createMessage(
  input: CreateMessageInput,
): Promise<{ id: string }> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("messages")
    .insert({
      board_id: input.board_id,
      author_name: input.author_name,
      content: input.content,
      card_color: input.card_color,
    })
    .select("id")
    .single();
  if (error) throw error;
  return { id: data.id };
}

export async function listMessagesByBoard(
  boardId: string,
): Promise<Message[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("board_id", boardId)
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Message[];
}

export async function getMessageById(id: string): Promise<Message | null> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as Message | null) ?? null;
}

export async function deleteMessageById(id: string): Promise<void> {
  const supabase = createServiceClient();
  const { error } = await supabase.from("messages").delete().eq("id", id);
  if (error) throw error;
}

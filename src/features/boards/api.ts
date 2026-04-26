import "server-only";
import { createServiceClient } from "@/lib/supabase/server";
import {
  generateAdminToken,
  generateBoardId,
} from "@/lib/id-generator";
import { addDays } from "@/lib/utils";
import type { Board, CreateBoardInput, PublicBoard } from "./types";

export async function createBoard(
  input: CreateBoardInput,
): Promise<{ id: string; adminToken: string }> {
  const supabase = createServiceClient();
  const id = generateBoardId();
  const adminToken = generateAdminToken();
  const deadlineDate = new Date(input.deadline);
  const expiresAt = addDays(deadlineDate, 90).toISOString();

  const { error } = await supabase.from("boards").insert({
    id,
    admin_token: adminToken,
    title: input.title,
    recipient_name: input.recipient_name,
    deadline: input.deadline,
    host_name: input.host_name,
    template: "simple",
    is_locked: false,
    expires_at: expiresAt,
  });

  if (error) throw error;
  return { id, adminToken };
}

export async function getBoardById(id: string): Promise<PublicBoard | null> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("boards")
    .select(
      "id, title, recipient_name, deadline, host_name, template, is_locked, created_at, expires_at",
    )
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as PublicBoard | null) ?? null;
}

export async function getBoardByAdminToken(
  token: string,
): Promise<Board | null> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .eq("admin_token", token)
    .maybeSingle();
  if (error) throw error;
  return (data as Board | null) ?? null;
}

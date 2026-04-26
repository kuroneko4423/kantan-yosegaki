import { z } from "zod";
import type { BoardRow } from "@/types/database";

export type Board = BoardRow;

export type PublicBoard = Omit<Board, "admin_token">;

export const createBoardSchema = z.object({
  title: z.string().trim().min(1, "タイトルを入力してください").max(100),
  recipient_name: z
    .string()
    .trim()
    .min(1, "贈る相手の名前を入力してください")
    .max(50),
  deadline: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "締切日を入力してください"),
  host_name: z
    .string()
    .trim()
    .min(1, "幹事の名前を入力してください")
    .max(50),
});

export type CreateBoardInput = z.infer<typeof createBoardSchema>;

import { z } from "zod";
import type { CardColor, MessageRow } from "@/types/database";

export type Message = MessageRow;
export type { CardColor };

export const CARD_COLORS: CardColor[] = [
  "cream",
  "pink",
  "mint",
  "sky",
  "lemon",
];

export const createMessageSchema = z.object({
  board_id: z.string().min(1),
  author_name: z
    .string()
    .trim()
    .min(1, "あなたの名前を入力してください")
    .max(50),
  content: z
    .string()
    .trim()
    .min(1, "メッセージを入力してください")
    .max(200, "200文字以内で入力してください"),
  card_color: z.enum(["cream", "pink", "mint", "sky", "lemon"]),
});

export type CreateMessageInput = z.infer<typeof createMessageSchema>;

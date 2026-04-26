import { NextRequest, NextResponse } from "next/server";
import { createMessage } from "@/features/messages/api";
import { createMessageSchema } from "@/features/messages/types";
import { getBoardById } from "@/features/boards/api";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = createMessageSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid input", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const board = await getBoardById(parsed.data.board_id);
  if (!board) {
    return NextResponse.json({ error: "board not found" }, { status: 404 });
  }

  const { id } = await createMessage(parsed.data);
  return NextResponse.json({ id }, { status: 201 });
}

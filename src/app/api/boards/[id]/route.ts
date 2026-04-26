import { NextRequest, NextResponse } from "next/server";
import { getBoardById } from "@/features/boards/api";
import { listMessagesByBoard } from "@/features/messages/api";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const board = await getBoardById(id);
  if (!board) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  const messages = await listMessagesByBoard(id);
  return NextResponse.json({ board, messages });
}

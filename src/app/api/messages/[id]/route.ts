import { NextRequest, NextResponse } from "next/server";
import {
  deleteMessageById,
  getMessageById,
} from "@/features/messages/api";
import { getBoardByAdminToken } from "@/features/boards/api";

export const runtime = "nodejs";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const message = await getMessageById(id);
  if (!message) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const adminToken = req.headers.get("x-admin-token");
  const ownerProof = req.headers.get("x-message-owner");

  let allowed = false;

  if (adminToken) {
    const board = await getBoardByAdminToken(adminToken);
    if (board && board.id === message.board_id) allowed = true;
  }

  // MVP self-delete: knowing the message id is treated as proof of ownership.
  // Trade-off documented in plan §5.3: message ids are UUIDs not exposed in
  // public board responses, so only the original poster (who stored it in
  // localStorage at post time) can present a matching value.
  if (!allowed && ownerProof && ownerProof === id) {
    allowed = true;
  }

  if (!allowed) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  await deleteMessageById(id);
  return new NextResponse(null, { status: 204 });
}

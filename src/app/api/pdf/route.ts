import { NextRequest } from "next/server";
import { getBoardByAdminToken } from "@/features/boards/api";
import { listMessagesByBoard } from "@/features/messages/api";
import { renderBoardToPdf } from "@/features/pdf/generator";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("adminToken");
  if (!token) {
    return new Response("missing adminToken", { status: 400 });
  }
  const board = await getBoardByAdminToken(token);
  if (!board) {
    return new Response("not found", { status: 404 });
  }
  const messages = await listMessagesByBoard(board.id);
  const buffer = await renderBoardToPdf({ board, messages });

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(
        board.title,
      )}.pdf"`,
    },
  });
}

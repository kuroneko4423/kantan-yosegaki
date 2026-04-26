import { NextRequest, NextResponse } from "next/server";
import { createBoard } from "@/features/boards/api";
import { createBoardSchema } from "@/features/boards/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = createBoardSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid input", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const { id, adminToken } = await createBoard(parsed.data);
  return NextResponse.json({ id, adminToken }, { status: 201 });
}

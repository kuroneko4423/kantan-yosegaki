import Link from "next/link";
import { notFound } from "next/navigation";
import { getBoardById } from "@/features/boards/api";
import { listMessagesByBoard } from "@/features/messages/api";
import { Button } from "@/components/ui/button";
import { MessageGrid } from "@/components/MessageGrid";
import { daysUntil, formatJapaneseDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ParticipantBoardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const board = await getBoardById(id);
  if (!board) notFound();

  const messages = await listMessagesByBoard(id);
  const remaining = daysUntil(board.deadline);
  const remainingLabel =
    remaining > 0
      ? `あと${remaining}日`
      : remaining === 0
        ? "本日締切"
        : "締切を過ぎました";

  return (
    <main className="container mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">{board.title}</h1>
        <p className="text-sm text-muted-foreground">
          📅 締切: {formatJapaneseDate(board.deadline)}({remainingLabel}) /
          👤 幹事: {board.host_name}
        </p>
      </header>

      <div className="mb-8 flex justify-end">
        <Button asChild>
          <Link href={`/boards/${id}/post`}>+ 自分のメッセージを書く</Link>
        </Button>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold">
          集まったメッセージ({messages.length}件)
        </h2>
        <MessageGrid boardId={id} messages={messages} mode="participant" />
      </section>
    </main>
  );
}

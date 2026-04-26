import Link from "next/link";
import { notFound } from "next/navigation";
import { getBoardById } from "@/features/boards/api";
import { MessageForm } from "@/components/MessageForm";

export const dynamic = "force-dynamic";

export default async function PostMessagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const board = await getBoardById(id);
  if (!board) notFound();

  return (
    <main className="container mx-auto max-w-xl px-4 py-12">
      <div className="mb-6">
        <Link
          href={`/boards/${id}`}
          className="text-sm text-muted-foreground hover:underline"
        >
          ← 寄せ書きに戻る
        </Link>
      </div>
      <h1 className="mb-2 text-2xl font-bold">メッセージを書く</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        {board.title} へ向けて
      </p>
      <MessageForm boardId={id} />
    </main>
  );
}

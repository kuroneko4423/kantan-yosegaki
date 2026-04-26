import Link from "next/link";
import { notFound } from "next/navigation";
import { getBoardByAdminToken } from "@/features/boards/api";
import { listMessagesByBoard } from "@/features/messages/api";
import { Button } from "@/components/ui/button";
import { MessageCard } from "@/components/MessageCard";

export const dynamic = "force-dynamic";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ adminToken: string }>;
}) {
  const { adminToken } = await params;
  const board = await getBoardByAdminToken(adminToken);
  if (!board) notFound();

  const messages = await listMessagesByBoard(board.id);

  return (
    <main className="container mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={`/admin/${adminToken}`}
          className="text-sm text-muted-foreground hover:underline"
        >
          ← 幹事ページへ戻る
        </Link>
        <Button asChild>
          <a href={`/api/pdf?adminToken=${adminToken}`}>PDFダウンロード</a>
        </Button>
      </div>

      <div className="rounded-xl border bg-[#FAF7F0] p-8">
        <h1 className="mb-1 text-center text-2xl font-bold">{board.title}</h1>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          贈る相手: {board.recipient_name} / 幹事: {board.host_name}
        </p>

        {messages.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            メッセージがまだありません
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {messages.map((m) => (
              <MessageCard
                key={m.id}
                message={m}
                canDelete={false}
                deleteVariant="admin"
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

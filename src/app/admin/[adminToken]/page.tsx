import Link from "next/link";
import { notFound } from "next/navigation";
import { getBoardByAdminToken } from "@/features/boards/api";
import { listMessagesByBoard } from "@/features/messages/api";
import { Button } from "@/components/ui/button";
import { MessageGrid } from "@/components/MessageGrid";
import { ShareLinks } from "@/components/ShareLinks";
import { daysUntil, formatJapaneseDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminBoardPage({
  params,
}: {
  params: Promise<{ adminToken: string }>;
}) {
  const { adminToken } = await params;
  const board = await getBoardByAdminToken(adminToken);
  if (!board) notFound();

  const messages = await listMessagesByBoard(board.id);
  const remaining = daysUntil(board.deadline);
  const remainingLabel =
    remaining > 0
      ? `あと${remaining}日`
      : remaining === 0
        ? "本日締切"
        : "締切を過ぎました";

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const participantUrl = `${baseUrl}/boards/${board.id}`;

  return (
    <main className="container mx-auto max-w-4xl px-4 py-10">
      <div className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
        幹事ページ
      </div>
      <header className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold">{board.title}</h1>
        <p className="text-sm text-muted-foreground">
          📅 締切: {formatJapaneseDate(board.deadline)}({remainingLabel}) /
          👤 幹事: {board.host_name}
        </p>
      </header>

      <div className="mb-8">
        <ShareLinks participantUrl={participantUrl} />
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href={`/admin/${adminToken}/preview`}>全体プレビュー</Link>
        </Button>
        <Button asChild>
          <a href={`/api/pdf?adminToken=${adminToken}`}>PDFダウンロード</a>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/boards/${board.id}/post`}>+ 自分も書き込む</Link>
        </Button>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold">
          集まったメッセージ({messages.length}件)
        </h2>
        <MessageGrid
          boardId={board.id}
          messages={messages}
          mode="admin"
          adminToken={adminToken}
        />
      </section>
    </main>
  );
}

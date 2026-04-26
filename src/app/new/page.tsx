import Link from "next/link";
import { BoardForm } from "@/components/BoardForm";

export default function NewBoardPage() {
  return (
    <main className="container mx-auto max-w-xl px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">
          ← トップへ戻る
        </Link>
      </div>
      <h1 className="mb-6 text-2xl font-bold">寄せ書きを作成</h1>
      <BoardForm />
    </main>
  );
}

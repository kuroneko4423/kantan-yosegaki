import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="container mx-auto max-w-2xl px-4 py-16">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">かんたん寄せ書き</h1>
        <p className="mt-3 text-muted-foreground">
          〜 気持ちが集まる、オンライン色紙 〜
        </p>
      </header>

      <div className="mt-10 flex justify-center">
        <Button asChild size="lg">
          <Link href="/new">+ 新しい寄せ書きを作成</Link>
        </Button>
      </div>

      <section className="mt-16">
        <h2 className="text-xl font-semibold">使い方</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm">
          <li>寄せ書きを作る(贈る相手・締切を設定)</li>
          <li>URLを共有する</li>
          <li>みんながメッセージを書き込む</li>
          <li>PDFで保存する</li>
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">こんな時に</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
          <li>退職、送別の寄せ書き</li>
          <li>誕生日のお祝い</li>
          <li>結婚祝い</li>
          <li>遠方の家族へのメッセージ</li>
        </ul>
      </section>
    </main>
  );
}

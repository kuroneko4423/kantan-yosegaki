"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ShareLinks({ participantUrl }: { participantUrl: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(participantUrl);
      setCopied(true);
      toast.success("URLをコピーしました");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("コピーに失敗しました");
    }
  };

  return (
    <div className="space-y-2 rounded-lg border bg-muted/30 p-4">
      <p className="text-sm font-medium">参加者用URL(みんなに共有)</p>
      <div className="flex gap-2">
        <Input value={participantUrl} readOnly className="font-mono text-xs" />
        <Button type="button" onClick={onCopy} variant="outline">
          {copied ? "✓ コピー済み" : "URLをコピー"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        ※ このページ(幹事ページ)のURLは共有しないでください。削除権限を持つ管理用URLです。
      </p>
    </div>
  );
}

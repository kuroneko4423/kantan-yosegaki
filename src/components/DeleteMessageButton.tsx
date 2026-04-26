"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type Props = {
  messageId: string;
  variant: "admin" | "self";
  adminToken?: string;
};

const STORAGE_KEY = (boardId: string) => `kyg.ownMessages.${boardId}`;

function forgetOwn(messageId: string) {
  if (typeof window === "undefined") return;
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (!key?.startsWith("kyg.ownMessages.")) continue;
    const arr: string[] = JSON.parse(
      window.localStorage.getItem(key) ?? "[]",
    );
    const filtered = arr.filter((id) => id !== messageId);
    if (filtered.length !== arr.length) {
      window.localStorage.setItem(key, JSON.stringify(filtered));
    }
  }
}

export function DeleteMessageButton({ messageId, variant, adminToken }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const onClick = async () => {
    if (!window.confirm("このメッセージを削除しますか?")) return;
    setBusy(true);
    try {
      const headers: Record<string, string> = {};
      if (variant === "admin" && adminToken) {
        headers["x-admin-token"] = adminToken;
      } else {
        headers["x-message-owner"] = messageId;
      }
      const res = await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
        headers,
      });
      if (!res.ok && res.status !== 204) {
        throw new Error("削除に失敗しました");
      }
      forgetOwn(messageId);
      router.refresh();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "エラーが発生しました";
      toast.error(msg);
      setBusy(false);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={busy}
      className="text-xs text-foreground/60 hover:text-destructive"
    >
      {busy ? "削除中..." : "削除"}
    </Button>
  );
}

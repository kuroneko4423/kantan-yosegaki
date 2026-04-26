"use client";

import { useEffect, useState } from "react";
import type { Message } from "@/features/messages/types";
import { MessageCard } from "./MessageCard";

type Props = {
  boardId: string;
  messages: Message[];
  mode: "participant" | "admin";
  adminToken?: string;
};

const STORAGE_KEY = (boardId: string) => `kyg.ownMessages.${boardId}`;

export function MessageGrid({ boardId, messages, mode, adminToken }: Props) {
  const [ownIds, setOwnIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY(boardId));
    if (raw) {
      try {
        const arr: string[] = JSON.parse(raw);
        setOwnIds(new Set(arr));
      } catch {
        // ignore corrupted storage
      }
    }
  }, [boardId]);

  if (messages.length === 0) {
    return (
      <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        まだメッセージがありません。最初の一通を書いてみませんか?
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {messages.map((m) => {
        const isOwn = ownIds.has(m.id);
        const canDelete = mode === "admin" || isOwn;
        return (
          <MessageCard
            key={m.id}
            message={m}
            canDelete={canDelete}
            deleteVariant={mode === "admin" ? "admin" : "self"}
            adminToken={adminToken}
          />
        );
      })}
    </div>
  );
}

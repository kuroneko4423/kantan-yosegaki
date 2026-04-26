"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CARD_COLORS,
  createMessageSchema,
  type CreateMessageInput,
} from "@/features/messages/types";
import type { CardColor } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const COLOR_CLASS: Record<CardColor, string> = {
  cream: "bg-card-cream",
  pink: "bg-card-pink",
  mint: "bg-card-mint",
  sky: "bg-card-sky",
  lemon: "bg-card-lemon",
};

const STORAGE_KEY = (boardId: string) => `kyg.ownMessages.${boardId}`;

function rememberOwn(boardId: string, messageId: string) {
  if (typeof window === "undefined") return;
  const arr: string[] = JSON.parse(
    window.localStorage.getItem(STORAGE_KEY(boardId)) ?? "[]",
  );
  arr.push(messageId);
  window.localStorage.setItem(STORAGE_KEY(boardId), JSON.stringify(arr));
}

export function MessageForm({ boardId }: { boardId: string }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateMessageInput>({
    resolver: zodResolver(createMessageSchema),
    defaultValues: {
      board_id: boardId,
      card_color: "cream",
      author_name: "",
      content: "",
    },
  });

  const selectedColor = watch("card_color");
  const content = watch("content") ?? "";

  const onSubmit = async (values: CreateMessageInput) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "投稿に失敗しました");
      }
      const { id } = await res.json();
      rememberOwn(boardId, id);
      router.push(`/boards/${boardId}`);
      router.refresh();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "エラーが発生しました";
      toast.error(msg);
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input type="hidden" {...register("board_id")} />

      <div className="space-y-1.5">
        <Label htmlFor="author_name">あなたの名前</Label>
        <Input id="author_name" {...register("author_name")} />
        {errors.author_name && (
          <p className="text-sm text-destructive">
            {errors.author_name.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="content">メッセージ</Label>
        <Textarea
          id="content"
          rows={6}
          maxLength={200}
          {...register("content")}
        />
        <div className="flex items-center justify-between">
          {errors.content ? (
            <p className="text-sm text-destructive">{errors.content.message}</p>
          ) : (
            <span />
          )}
          <span className="text-xs text-muted-foreground">
            {content.length} / 200
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label>カードの色</Label>
        <div className="flex gap-3">
          {CARD_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() =>
                setValue("card_color", c, { shouldValidate: true })
              }
              className={cn(
                "h-10 w-10 rounded-full border-2 transition",
                COLOR_CLASS[c],
                selectedColor === c
                  ? "border-foreground scale-110"
                  : "border-transparent",
              )}
              aria-label={`色: ${c}`}
            />
          ))}
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? "投稿中..." : "投稿する"}
      </Button>
    </form>
  );
}

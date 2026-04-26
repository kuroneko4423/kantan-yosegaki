"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createBoardSchema,
  type CreateBoardInput,
} from "@/features/boards/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BoardForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBoardInput>({
    resolver: zodResolver(createBoardSchema),
  });

  const onSubmit = async (values: CreateBoardInput) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/boards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "作成に失敗しました");
      }
      const { adminToken } = await res.json();
      router.push(`/admin/${adminToken}`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "エラーが発生しました";
      toast.error(msg);
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="title">寄せ書きのタイトル</Label>
        <Input
          id="title"
          placeholder="例: 山田部長 退職おめでとうございます"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="recipient_name">贈る相手の名前</Label>
        <Input
          id="recipient_name"
          placeholder="例: 山田部長"
          {...register("recipient_name")}
        />
        {errors.recipient_name && (
          <p className="text-sm text-destructive">
            {errors.recipient_name.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="deadline">締切日</Label>
        <Input id="deadline" type="date" {...register("deadline")} />
        {errors.deadline && (
          <p className="text-sm text-destructive">{errors.deadline.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="host_name">幹事の名前</Label>
        <Input
          id="host_name"
          placeholder="例: 田中"
          {...register("host_name")}
        />
        {errors.host_name && (
          <p className="text-sm text-destructive">{errors.host_name.message}</p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? "作成中..." : "寄せ書きを作成"}
      </Button>
    </form>
  );
}

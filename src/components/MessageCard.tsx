import type { Message } from "@/features/messages/types";
import type { CardColor } from "@/types/database";
import { cn } from "@/lib/utils";
import { DeleteMessageButton } from "./DeleteMessageButton";

const COLOR_CLASS: Record<CardColor, string> = {
  cream: "bg-card-cream",
  pink: "bg-card-pink",
  mint: "bg-card-mint",
  sky: "bg-card-sky",
  lemon: "bg-card-lemon",
};

type Props = {
  message: Message;
  canDelete: boolean;
  deleteVariant: "admin" | "self";
  adminToken?: string;
};

export function MessageCard({
  message,
  canDelete,
  deleteVariant,
  adminToken,
}: Props) {
  return (
    <div
      className={cn(
        "relative rounded-lg p-4 shadow-sm",
        COLOR_CLASS[message.card_color],
      )}
    >
      <p className="mb-2 text-xs font-medium text-foreground/70">
        {message.author_name}
      </p>
      <p className="whitespace-pre-wrap text-sm leading-relaxed">
        {message.content}
      </p>
      {canDelete && (
        <div className="mt-3 flex justify-end">
          <DeleteMessageButton
            messageId={message.id}
            variant={deleteVariant}
            adminToken={adminToken}
          />
        </div>
      )}
    </div>
  );
}

import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { CardColor } from "@/types/database";
import type { Message } from "@/features/messages/types";
import type { PublicBoard } from "@/features/boards/types";
import { computeColumns } from "./layout";

Font.register({
  family: "NotoSansJP",
  fonts: [
    {
      src: "https://fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Regular.otf",
      fontWeight: "normal",
    },
  ],
});

const COLOR_MAP: Record<CardColor, string> = {
  cream: "#FFF7E6",
  pink: "#FFE4EC",
  mint: "#E0F5EA",
  sky: "#E3F0FB",
  lemon: "#FFF7C2",
};

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontFamily: "NotoSansJP",
    backgroundColor: "#FAF7F0",
  },
  title: { fontSize: 20, marginBottom: 6, textAlign: "center" },
  meta: {
    fontSize: 10,
    marginBottom: 16,
    textAlign: "center",
    color: "#666666",
  },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  card: { borderRadius: 8, padding: 10, marginBottom: 8, marginRight: "1%" },
  author: { fontSize: 9, marginBottom: 4, color: "#444444" },
  body: { fontSize: 11, lineHeight: 1.4 },
});

export type YosegakiPdfProps = {
  board: Pick<PublicBoard, "title" | "recipient_name" | "host_name">;
  messages: Pick<Message, "id" | "author_name" | "content" | "card_color">[];
};

export function YosegakiPdfDocument({ board, messages }: YosegakiPdfProps) {
  const cols = computeColumns(messages.length);
  const widthPct = `${Math.floor(100 / cols) - 1}%`;
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.title}>{board.title}</Text>
        <Text style={styles.meta}>
          贈る相手: {board.recipient_name} / 幹事: {board.host_name}
        </Text>
        <View style={styles.grid}>
          {messages.map((m) => (
            <View
              key={m.id}
              style={[
                styles.card,
                { width: widthPct, backgroundColor: COLOR_MAP[m.card_color] },
              ]}
            >
              <Text style={styles.author}>{m.author_name}</Text>
              <Text style={styles.body}>{m.content}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

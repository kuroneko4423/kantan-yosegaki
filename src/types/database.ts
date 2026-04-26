export type CardColor = "cream" | "pink" | "mint" | "sky" | "lemon";

export type BoardRow = {
  id: string;
  admin_token: string;
  title: string;
  recipient_name: string;
  deadline: string;
  host_name: string;
  template: string;
  is_locked: boolean;
  created_at: string;
  expires_at: string;
};

export type MessageRow = {
  id: string;
  board_id: string;
  author_name: string;
  content: string;
  card_color: CardColor;
  position: number;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      boards: {
        Row: BoardRow;
        Insert: Omit<BoardRow, "created_at"> & { created_at?: string };
        Update: Partial<BoardRow>;
      };
      messages: {
        Row: MessageRow;
        Insert: Omit<MessageRow, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<MessageRow>;
      };
    };
  };
};

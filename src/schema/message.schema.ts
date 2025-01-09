interface Message {
  id: number;
  duck_id: string;
  duck_name: string;
  message_text: string;
  user_id: string;
  created_at: Date;
}

export type { Message };

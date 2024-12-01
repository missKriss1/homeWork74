export interface Message {
    message: string;
    data: string
}

export type  MessagesWithoyId = Omit<Message, 'id'>
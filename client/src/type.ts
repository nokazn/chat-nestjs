export type ChatMessage = {
  author: string
  message: string
  createdAt: Date
}

export type ChatState = {
  input: string
  messageList: ChatMessage[]
}

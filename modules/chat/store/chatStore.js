import { create } from 'zustand'

export const useChatStore = create((set) => ({
  chats:[],
  activeChatId: null,
  messages:[],
  setActiveChatId: (chatId) => set({ activeChatId: chatId }),
  setChats:(chats)=>set({chats}),
  setMessages:(messages)=>set({messages}),
  addChats:(chat)=>set({chats:[chat,...get().chats]}),
  addMessage:(message)=>set({messages:[...get().messages,message]}),
  clearMessage:()=>set({messages:[]})

}))



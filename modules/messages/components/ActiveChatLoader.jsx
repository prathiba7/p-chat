"use client"
import React ,{useEffect}from 'react'
import { useChatStore } from '../../chat/store/chatStore'
import { useGetChatById } from '../../chat/components/hooks/use-chat'


const ActiveChatLoader = ({chatId}) => {
    const {setActiveChatId,setMessages,addChat,chats}=useChatStore()

    const {data}=useGetChatById(chatId)

    useEffect(()=>{

        if(!chatId){
            return
        }
        setActiveChatId(chatId)
    },[chatId,setActiveChatId])

    useEffect(()=>{
        if(!data || !data.success || !data.data) return;
        const chat=data.data
        setMessages(chat.messages || [])
        if(!chats?.some((c)=>c.id===chatId)){
            addChat(chat)
        }

    },[data,setMessages,addChat,chats])

  return (
    <div>
      hi
    </div>
  )
}

export default ActiveChatLoader

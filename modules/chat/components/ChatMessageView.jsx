"use client"

import React,{useState} from 'react'
import {ChatWelcomeTabs} from './ChatWelcomeTabs'
import {ChatMessageForm} from './ChatMessageForm'

export const ChatMessageView = ({user}) => {

    const [selectedMessage,setSelectedMessage]=useState("")

    const handleMessageSelect = (message)=>{
        setSelectedMessage(message)
    }

    const handleMessageChange=()=>{
        setSelectedMessage("")
    }
  return (
    <div className='flex min-h-full w-full flex-col items-center justify-start gap-6 overflow-y-auto px-3 py-6 sm:px-6 lg:justify-center lg:py-10'>
      <ChatWelcomeTabs userName={user?.name} onMessageSelect={handleMessageSelect} />
      <ChatMessageForm initialMessage={selectedMessage} onMessageChange={handleMessageChange} />
    </div>
  )
}


"use client"
import React,{useEffect, useState} from 'react'
import { Textarea} from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
export const ChatMessageForm = ({initalMessage,OnMessageChange}) => {
    const [message,setMessage]=useState("")

    useEffect(()=>{
        if(initalMessage){
            setMessage(initalMessage)
            OnMessageChange?.("")
        }
    },[initalMessage,OnMessageChange])


    const handleSubmit=async(e)=>{
        try{
            e.preventDefault()
            console.log('message sent')
        }catch(err){
            console.log('err',err)
        }
    }
  return (
    <div className='w-full max-w-3xl mx-auto px-4 pb-6'>
        <form onSubmit={()=>{}}>
            <div className='relative rounded-2xl border-border shadow-sm transition-all'>
                <Textarea value={message} onChange={(e)=>setMessage(e.target.value)} 
                placeholder='Type your message here...'
                className='min-h-[60px] max-h[200px] resize-none border-0 bg-transparent px-4 py-3 text-base focus-visible:ring-0 focus-visible:ring-offset-0'
                onKeyDown={(e)=>{if(e.key==="Enter" && !e.shiftKey){
                    e.preventDefault()
                    handleSubmit(e)
                }}}
                />

                <div className='flex items-center justify-between gap-2 px-3 border-t'>
                    <Button> Select a modal</Button>
                </div>
            </div>
        </form>
    </div>
  )
}



"use client"
import React,{useEffect, useState} from 'react'
import { Textarea} from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

export const ChatMessageForm = ({ initialMessage, onMessageChange }) => {
    const [message,setMessage]=useState("")

    useEffect(()=>{
        if(initialMessage){
            setMessage(initialMessage)
            onMessageChange?.("")
        }
    },[initialMessage, onMessageChange])

    const handleSubmit=async(e)=>{
        try{
            e.preventDefault()
            console.log('message sent')
        }catch(err){
            console.log('err',err)
        }
    }

  return (
    <div className='mx-auto w-full max-w-3xl px-2 pb-6 sm:px-4'>
        <form onSubmit={handleSubmit} className='w-full'>
            <div className='relative overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all'>
                <Textarea value={message} onChange={(e)=>setMessage(e.target.value)} 
                placeholder='Type your message here...'
                className='min-h-[72px] max-h-[200px] w-full resize-none border-0 bg-transparent px-4 py-3 text-base focus-visible:ring-0 focus-visible:ring-offset-0'
                onKeyDown={(e)=>{if(e.key==="Enter" && !e.shiftKey){
                    e.preventDefault()
                    handleSubmit(e)
                }}}
                />

                <div className='flex items-center justify-between gap-2 border-t border-border px-3 py-2'>
               <div className='flex items-center gap-1'>
                     <Button type='button' variant='outline'>Select a model</Button>
               </div>
                        <Button type='submit' disabled={!message.trim()} size={"sm"} variant={message.trim()?"default":"ghost"}
                className={'h-8 w-8 p-0 rounded-full'}
                >
                    <Send className='h-4 w-4'/>
                    <span className='sr-only'>Send message</span>
                </Button>
                </div>
            
            </div>
        </form>
    </div>
  )
}



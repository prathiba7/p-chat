
"use client"
import React,{useState,useMemo} from 'react'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContext
} from "@/components/ui/dropdown-menu"

import {Button} from '../../../components/ui/button'
import {Input} from '../../../components/ui/input'
import {cn} from '../../../lib/utils'
import {PlusIcon,SearchIcon,MenuIcon,EllipseIcon,Trash,EllipsisIcon} from 'lucide-react'
import Link from 'next/link'
import {UserButton }from '../../authentication/components/user-button'
import { useChatStore } from '../store/chatStore'
import { DeleteChatModal } from './modal/chat-delete-model'


const ChatSidebar=({user,chats} )=> {
   const {activeChatId }=useChatStore()
    const [searchQuery,setSearchQuery]=useState('')
    const [selectedChatId,setSelectedChatId]=useState(null)
    const [isModalOpen,setIsModelOpen]=useState(false)

    const filteredChats=useMemo(()=>{
      if(!searchQuery?.trim()){
        return chats
      }

      const query=searchQuery.toLocaleLowerCase()
      return chats.filter(chat=>
        chat.title?.toLowerCase().includes(query) || 
        chat.message?.some(msg=> msg.content?.toLowerCase().includes(query))
      )
    },[chats,searchQuery])

    //group chats by date
    const groupedChats=useMemo(()=>{
      const now=new Date()
      const today=new Date(now.getFullYear(),now.getMonth(),now.getDate())
      const yesterday=new Date(today)
      yesterday.setDate(yesterday.getDate()-1)
      const lastweek=new Date(today)
      lastweek.setDate(lastweek.getDate()-7)

      const groups ={
        today:[],
        yesterday:[],
        lastweek:[],
        older:[]
      }

    filteredChats.forEach(chat=>{
      const chatDate= new Date(chat.createdAt)
        if(chatDate>=today){
          groups.today.push(chat)
        }else if (chatDate>=yesterday){
          groups.yesterday.push(chat)
        }else if (chatDate>=lastweek){
          groups.lastweek.push(chat)
        }else{
          groups.older.push(chat)
        }
      })
      return groups

    },[filteredChats])
    
    const handleSearchQueryChange=(e)=>{
            setSearchQuery(e.target.value)
    }
    const onDelete = (e,chatId)=>{
        e.preventDefault()
        e.stopPropagation()
        setSelectedChatId(chatId)
        setIsModelOpen(true)
    }

    const renderChatList =(chatList)=>{
      if(chatList.length===0) return null
      return chatList.map((chat)=>(
        <div
          key={chat.id}
          className={cn(
            "flex items-center gap-2 rounded-lg text-sm text-sidebar-foreground transition-colors",
            chat.id===activeChatId && "bg-sidebar-accent"
          )}
        >
          <Link
            href={`/chat/${chat.id}`}
            className="block min-w-0 flex-1 rounded-lg px-3 py-2 hover:bg-sidebar-accent transition-colors"
          >
            <span className='block truncate'>{chat.title}</span>
          </Link>
                  <DeleteChatModal
              chatId={chat.id}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModelOpen}
      
      />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                   variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0 hover:bg-sidebar-accent-foreground/10"
            onClick={(e) => e.preventDefault()}
                >
                  <EllipsisIcon className='h-4 w-4'/>
                </Button>
              
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="flex flex-row gap-2 cursor-pointer"
                onClick={(e)=>onDelete(e,chat.id)}
              >
                <Trash className='h-4 w-4 text-red-500'/>
                <span className='text-red-500'>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
 
        </div>
      ))
    }
  return (
    <aside className='flex h-full w-56 shrink-0 flex-col border-r border-border bg-sidebar sm:w-60'>
        <div className='flex items-center justify-between border-b border-sidebar-border px-4 py-3'>
            <div className='flex items-center gap-2'>
                <p className='text-base font-semibold'>P chat</p>
            </div>
        </div>
        <div className='p-4'>
             <Link href={"/"}>
             <Button className={"w-full"}>
                <PlusIcon className="mr-2 h-4 w-4"/>
                New Chat
             </Button>
             </Link>
      </div>
      <div className='px-4 pb-4'>
            <div className='relative'>
                    <SearchIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'/>
                    <Input placeholder='Search your chat' className='border-sidebar-border bg-sidebar-accent pl-9 pr-8' value={searchQuery} onChange={handleSearchQueryChange}/>
            </div>
      </div>
      <div className='flex-1 overflow-y-auto px-2'>
      {
        filteredChats.length===0 ?(
          <div className='text-center text-sm text-muted-foreground py-8'>
            {searchQuery? "No chat Founds":"No chats yet "}
          </div>
        ):(
          <>
          {groupedChats.today.length>0 && (
            <div className='mb-4'>
              <div className='mb-2 px-2 text-xs font-semibold text-muted-foreground'>
                Today
              </div>
              {renderChatList(groupedChats.today)}
            </div>
          )}
          {groupedChats.yesterday.length>0 && (
            <div className='mb-4'>
              <div className='mb-2 px-2 text-xs font-semibold text-muted-foreground'>
                Yesterday
              </div>
              {renderChatList(groupedChats.yesterday)}
            </div>
          )}
        {groupedChats.lastweek.length>0 && (
            <div className='mb-4'>
              <div className='mb-2 px-2 text-xs font-semibold text-muted-foreground'>
                Last 7 Days
              </div>
              {renderChatList(groupedChats.lastweek)}
            </div>
          )}
          {groupedChats.older.length>0 && (
            <div className='mb-4'>
              <div className='mb-2 px-2 text-xs font-semibold text-muted-foreground'>
                older
              </div>
              {renderChatList(groupedChats.older)}
            </div>
          )}
          </>
        )
      }
      </div>
      <div className='flex items-center gap-3 border-t border-sidebar-border p-4'>
        <UserButton user={user}/>
        <span className='flex-1 truncate text-sm text-sidebar-foreground'>{user.email}</span>
      </div>

    </aside>
  )
}



export default ChatSidebar


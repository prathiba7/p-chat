
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
} from "@/components/ui/dropdown-menu"
import {Button} from '../../../components/ui/button'
import {Input} from '../../../components/ui/input'
import {cn} from '../../../lib/utils'
import {PlusIcon,SearchIcon,MenuIcon,EllipseIcon,Trash} from 'lucide-react'
import Link from 'next/link'
import {UserButton }from '../../authentication/components/user-button'
const ChatSidebar=({user} )=> {
    const [searchQuery,setSearchQuery]=useState()

    const handleSearchQueryChange=(e)=>{
            setSearchQuery(e.target.value)
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
        <div className='py-8 text-center text-sm text-muted-foreground'>No chats yet</div>
      </div>
      <div className='flex items-center gap-3 border-t border-sidebar-border p-4'>
        <UserButton user={user}/>
        <span className='flex-1 truncate text-sm text-sidebar-foreground'>{user.email}</span>
      </div>
    </aside>
  )
}



export default ChatSidebar


import React from 'react'
import {auth } from '../../lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import ChatSidebar from '../../modules/chat/components/ChatSidebar'
import { currentUser }from '../../modules/authentication/action'
import Header from '../../modules/chat/components/Header'

const  layout= async({children}) =>{
  const session=await auth.api.getSession({
    headers:await headers()
  })

  if(!session){
    return redirect("/sign-in")
  }
  const user=await currentUser()
  return (
    <div className='flex overflow-hidden h-screen'>
      {/* chatsidebar */}
      <ChatSidebar user={user}/>
      <main className='flex-1 overflow-hidden'>
            <Header/>
            {children}
      </main>
    </div>
  )
}

export default layout

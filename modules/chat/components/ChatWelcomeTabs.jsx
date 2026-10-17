"use client"

import { Button } from '@/components/ui/button'
import { Code, GraduationCap, Newspaper, Sparkles } from 'lucide-react'
import React,{useState} from 'react'
import {Separator} from '../../../components/ui/separator'
const CHAT_TAB_MESSAGE = [
  {
    tabName: "Create",
    icon: <Sparkles className="h-4 w-4" />,
    messages: [
      "Write a short story about a robot discovering emotions.",
      "Help me outline a sci-fi novel set in a post-apocalyptic world.",
      "Give me 5 creative writing prompts for flash fiction."
    ]
  },
  {
    tabName: "Explore",
    icon: <Newspaper className="h-4 w-4" />,
    messages: [
      "Explain 5 fascinating scientific discoveries that changed the world.",
      "Explore the latest trends in artificial intelligence and technology.",
      "Recommend 5 interesting topics to explore and explain why they matter."
    ]
  },
  {
    tabName: "Code",
    icon: <Code className="h-4 w-4" />,
    messages: [
      "Write a responsive React component using Tailwind CSS.",
      "Debug this JavaScript code and explain how to fix the errors.",
      "Build a REST API using Node.js and Express with CRUD operations."
    ]
  },
  {
    tabName: "Learn",
    icon: <GraduationCap className="h-4 w-4" />,
    messages: [
      "Explain machine learning in simple terms with real-world examples.",
      "Teach me JavaScript step by step, starting with the basics.",
      "Create a 7-day study plan to improve my problem-solving skills."
    ]
  }
]

export const ChatWelcomeTabs = ({userName,onMessageSelect}) => {
    const [activeTab,setActiveTab]=useState(0)
  return (
    <div className='flex flex-col items-center justify-center px-4'>
        <div className='w-full max-w-3xl space-y-8'>
            <h1 className='text-2xl font-semibold'>
                       How can i help you ,{userName.slice(0,userName.indexOf(""))|| userName}?
            </h1>
            <div className='flex flex-wrap gap-2 w-full'>
                {CHAT_TAB_MESSAGE?.map((tab,index)=>(
                        <Button
                        key={tab.tabName}
                        variant={activeTab ===index? 'default':"secondary"}
                        onClick={()=>setActiveTab(index)}
                        className="w-[110px] justify-start'"
                        >
                            {tab.icon}
                            <span className='ml-2'>{tab.tabName}</span>

                        </Button>
                ))}
                        
            </div>
            <div className='space-y-3 w-full min-h-[240px]'>
                {CHAT_TAB_MESSAGE[activeTab].messages.map((message,index)=>(
                    <div key={index}>
                        <button
                        onClick={()=>onMessageSelect(message)}
                        className={"w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors duration-300 ease-in-out py-2"}
                         >
                            {message}

                        </button>
                        {index<CHAT_TAB_MESSAGE[activeTab].messages.length-1 && (
                            <Separator/>
                        )}
                    </div>
                ))}

            </div>
     
        </div>
    </div>
  )
}



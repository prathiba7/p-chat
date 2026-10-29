"use server"

import db from '@/lib/db'
import { currentUser } from '../../authentication/action'
import { MessageRole, MessageType } from '@/src/generated/prisma/client'
import { revalidatePath } from 'next/cache'
import { success } from 'better-auth'

export const createChatWithMessage = async (values) => {
  try {
    const user = await currentUser()
    if (!user) {
      return {
        success: true,
        message: 'Unauthorized user'
      }
    }

    const { content, model } = values
    if (!content || !content.trim()) {
      return { success: false, message: 'Message content is required' }
    }

    const title = content.length > 50 ? `${content.slice(0, 50)}...` : content

    const chat = await db.chat.create({
      data: {
        title,
        model,
        userId: user.id,
        messages: {
          create: {
            content,
            messageRole: MessageRole.USER,
            messageType: MessageType.NORMAL,
            model
          }
        }
      },
      include: {
        messages: true
      }
    })

        revalidatePath("/")

        return {success:true,message:"Chat created successfully",data:chat}
    }catch(err){
        console.log('ERROR creating chat',err)
        return {success:false,message: "Failed to create chat"}

    }
}

export const getAllChats =async()=>{
    try{
        const user=await currentUser()
          if (!user) {
            return {
                success: true,
                message: 'Unauthorized user'
            }
        }

        const chats= await db.chat.findMany({
            where:{
                userId:user.id
            },
            include:{
                messages:true
            },
            orderBy:{
                createdAt:"desc"
            }
        })
        return {
            success:true,
            message:"Chats fetched successfully",
            data:chats
        }
    }catch(error){
        console.log('error fetching chats',error)
        return {
            success:false,
            message:"Failed to fetch chats"
        }
    }
}

export const deleteChat =async(chatId)=>{
  try{
    const user = await currentUser()
    if(!user){
      return {
        sucess:false,
        message:"Unauthorised user"
      }
    }

    const chat = await db.chat.findUnique({
      where:{
        id:chatId,
        userId:user.id
      }
    })

    if(!chat){
      return{
      sucess:false,
      message:"chat not found"}
    }

    await db.chat.delete({
      where:{
        id:chatId
      }
    })

    revalidatePath("/")
    return{
      success:true,
      message:"Chat deleted successfully"
    }
  }catch(error){
    console.log('err',error)
    return { 
      success:false,
      message:"Failed to delete chat"
    }
  }
}



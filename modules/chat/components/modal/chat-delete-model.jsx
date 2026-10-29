"use client"
import Modal from "../../../../components/ui/modal"
import {useDeleteChat} from '../hooks/use-chat'
import React from "react"
import {toast} from "sonner"


export const DeleteChatModal =({isModalOpen,setIsModalOpen,chatId})=>{


    const {mutateAsync,isPending}=useDeleteChat(chatId)

    const handleDelete = async()=>{
        try{
            await mutateAsync()
            toast.success("Chat Deeleted Successfuly")
            setIsModalOpen(false)
        }catch(err){
            toast.error("Failed to delete chat")
            console.error("Failed to delete chat",err)
        }
    }

    return(
        <Modal
        title={"Delete chat"}
        description={"Are you sure you want to delete this chat?this action canot be undone"}
        isOpen={isModalOpen}
        onClose={()=>setIsModalOpen(false)}
        onSubmit={handleDelete}
        submitText={isPending? "Deleting...":"Delete"}
        submitVariant="destrutive"
        >

        </Modal>
    )

}

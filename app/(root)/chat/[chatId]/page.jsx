import React from 'react'
import ActiveChatLoader from '../../../../modules/messages/components/ActiveChatLoader';
import {MessageWithForm} from '../../../../modules/messages/components/MessageWithForm'
const Page = async({params}) => {
    const {chatId}=await params;

  return (
    <>
      <ActiveChatLoader chatId={chatId}/>
      <MessageWithForm chatId={chatId}
      />
    </>
  )
}

export default Page

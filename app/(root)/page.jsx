import { UserButton } from '@/modules/authentication/components/user-button'
import { currentUser } from '@/modules/authentication/action/index'
import { ChatMessageView } from '@/modules/chat/components/ChatMessageView'
export const dynamic = 'force-dynamic'

export default async function Home  () {
   const user = await currentUser()

   
  return (
     <ChatMessageView user={user}/>
  );
}

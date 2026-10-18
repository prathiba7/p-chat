"use client"
import React, { useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { ModelSelector } from './ModelSelector'
import { useAIModels } from '../../../modules/ai-agent/hook/ai-agent'
import { Spinner } from '@/components/ui/spinner'
import { useCreateChat } from '../components/hooks/use-chat'
import { toast } from 'sonner'

export const ChatMessageForm = ({ initialMessage, onMessageChange }) => {
    const [message, setMessage] = useState("")
    const { data: models, isPending } = useAIModels()
    const [selectedModel, setSelectedModel] = useState("")
    const { mutateAsync, isPending: isChatPending } = useCreateChat()

    useEffect(() => {
        const firstModelId = models?.models?.[0]?.id
        if (firstModelId && !selectedModel) {
            setSelectedModel(firstModelId)
        }
    }, [models, selectedModel])

    useEffect(() => {
        if (initialMessage) {
            setMessage(initialMessage)
            onMessageChange?.("")
        }
    }, [initialMessage, onMessageChange])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            await mutateAsync({ content: message, model: selectedModel })
            toast.success("Message sent successfuly")
        } catch (err) {
            console.log('err', err)
            toast.error("Failed to send message")
        } finally {
            setMessage("")
        }
    }

    return (
        <div className='mx-auto w-full max-w-3xl px-2 pb-6 sm:px-4'>
            <form onSubmit={handleSubmit} className='w-full'>
                <div className='relative overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all'>
                    <Textarea value={message} onChange={(e) => setMessage(e.target.value)}
                        placeholder='Type your message here...'
                        className='min-h-[72px] max-h-[200px] w-full resize-none border-0 bg-transparent px-4 py-3 text-base focus-visible:ring-0 focus-visible:ring-offset-0'
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                handleSubmit(e)
                            }
                        }}
                    />

                    <div className='flex items-center justify-between gap-2 border-t border-border px-3 py-2'>
                        <div className='flex items-center gap-1'>
                            {isPending ? (
                                <Spinner />
                            ) : (
                                <ModelSelector
                                    models={models?.models || []}
                                    selectedModelId={selectedModel}
                                    onModelSelect={setSelectedModel}
                                    className={'ml-1'}
                                />
                            )}
                        </div>

                        <Button type='submit' disabled={!message.trim() || isChatPending} size={'sm'} variant={message.trim() ? 'default' : 'ghost'}
                            className={'h-8 w-8 rounded-full p-0'}
                        >
                            {isChatPending ? <>
                            <Spinner/>
                            </> : <> <Send className='h-4 w-4' />
                                <span className='sr-only'>Send message</span></>}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}



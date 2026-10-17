"use client"

import { useState } from 'react';
import { Check, ChevronDown, Info, Search, Sparkles } from 'lucide-react'
import {
    Button
} from '../../../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'
import { Badge } from '../../../components/ui/badge'
import { ScrollArea } from '../../../components/ui/scroll-area'
import { Separator } from '../../../components/ui/separator'
import { Input } from '../../../components/ui/input'
import { cn } from '../../../lib/utils'

export const ModelSelector = ({
    models = [],
    selectedModelId,
    onModelSelect,
    className
}) => {
    const [open, setOpen] = useState(false)
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [selectedForDetails, setSelectedForDetails] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")

    const safeModels = Array.isArray(models) ? models : []
    const selectedModel = safeModels.find((m) => m.id === selectedModelId)

    const formatContextLength = (length) => {
        if (length >= 1000000) return `${(length / 1000000).toFixed(1)}M`
        if (length >= 1000) return `${(length / 1000).toFixed(1)}K`
        return length.toString()
    }
    const isFreeModel = (model) => {
        return (
            model.pricing.prompt === "0" &&
            model.pricing.completion === "0" &&
            model.pricing.request === "0"
        )
    }

    const openModelDetails = (model, e) => {
        e.stopPropogation()
        setSelectedForDetails(model)
        setDetailsOpen(true)

    }

    const filteredModels = safeModels.filter((model) => {
        const query = searchQuery.toLowerCase()
        return (
            model.name.toLowerCase().includes(query) ||
            model.description.toLowerCase().includes(query) ||
            model.id.toLowerCase().includes(query) ||
            model.architecture?.modality?.toLowerCase().includes(query)
        )
    })

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant={"ghost"}
                        role="combobox"
                        aria-expanded={open}
                        className={cn("h-8 justify-between gap-2 px-2 text-xs hover:bg-accent", className)}
                    >
                        <div className='flex items-center gap-1.5 min-w-0'>
                            <Sparkles className='h-3.5 w-3.5 shrink-0 text-muted-foreground' />
                            <span className='truncate font-medium'>
                                {selectedModel?.name || "Select model"}
                            </span>
                        </div>
                        <ChevronDown className='h-3.5 w-3.5 shrink-0 opacity-50' />
                    </Button>

                </PopoverTrigger>
                <PopoverContent className={"w-3xl p-0"} align='start'>
                    <div className='p-3 border-b'>
                        <div className='relative'>
                            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                            <Input
                                placeholder='search models..'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='h-9 pl-9'
                            />
                        </div>
                    </div>
                    <ScrollArea className={'h-[400px'}>
                        <div className='p-2'>
                            <div className='px-2 py-1.5 text-xs font-semibold text-muted-foreground'>
                                Available Models({filteredModels.length})
                            </div>
                        </div>

                    </ScrollArea>

                </PopoverContent>

            </Popover>
        </div>
    )
}
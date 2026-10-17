"use client"

import { useState } from 'react'
import { Check, ChevronDown, Info, Search, Sparkles } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'
import { Badge } from '../../../components/ui/badge'
import { ScrollArea } from '../../../components/ui/scroll-area'
import { Separator } from '../../../components/ui/separator'
import { Input } from '../../../components/ui/input'
import { cn } from '../../../lib/utils'

const formatContextLength = (length) => {
  const value = Number(length) || 0
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
  return String(value)
}

const isFreeModel = (model) => {
  if (!model?.pricing) return false

  const entries = Object.entries(model.pricing ?? {})
  if (entries.length === 0) return false

  return entries.every(([_, value]) => Number(value) === 0)
}

export const ModelSelector = ({
  models = [],
  selectedModelId,
  onModelSelect,
  className,
}) => {
  const [open, setOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedForDetails, setSelectedForDetails] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const safeModels = Array.isArray(models) ? models : []
  const selectedModel = safeModels.find((m) => m?.id === selectedModelId) ?? null

  const filteredModels = safeModels.filter((model) => {
    if (!model) return false
    const query = searchQuery.toLowerCase()
    const modality = model?.architecture?.modality ?? ''

    return (
      (model.name ?? '').toLowerCase().includes(query) ||
      (model.description ?? '').toLowerCase().includes(query) ||
      (model.id ?? '').toLowerCase().includes(query) ||
      modality.toLowerCase().includes(query)
    )
  })

  const openModelDetails = (model, e) => {
    e.stopPropagation()
    setSelectedForDetails(model)
    setDetailsOpen(true)
  }

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='ghost'
            role='combobox'
            aria-expanded={open}
            className={cn('h-8 justify-between gap-2 px-2 text-xs hover:bg-accent', className)}
          >
            <div className='flex min-w-0 items-center gap-1.5'>
              <Sparkles className='h-3.5 w-3.5 shrink-0 text-muted-foreground' />
              <span className='truncate font-medium'>
                {selectedModel?.name || 'Select model'}
              </span>
            </div>
            <ChevronDown className='h-3.5 w-3.5 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-[min(90vw,40rem)] p-0' align='start'>
          <div className='border-b p-3'>
            <div className='relative'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search models...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='h-9 pl-9'
              />
            </div>
          </div>

          <ScrollArea className='h-[400px]'>
            <div className='p-2'>
              <div className='px-2 py-1.5 text-xs font-semibold text-muted-foreground'>
                Available Models ({filteredModels.length})
              </div>
            </div>

            {filteredModels.length === 0 ? (
              <div className='px-2 py-8 text-center text-sm text-muted-foreground'>
                No models found matching "{searchQuery}"
              </div>
            ) : (
              filteredModels.map((model) => {
                const isSelected = selectedModelId === model.id

                return (
                  <div
                    key={model.id}
                    className={cn(
                      'relative flex cursor-pointer select-none items-start gap-2 rounded-md px-2 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground',
                      isSelected && 'bg-accent'
                    )}
                    onClick={() => {
                      onModelSelect?.(model.id)
                      setOpen(false)
                      setSearchQuery('')
                    }}
                  >
                    <div className='flex h-5 items-center'>
                      <Check className={cn('h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')} />
                    </div>

                    <div className='min-w-0 flex-1 space-y-1'>
                      <div className='flex items-center gap-2'>
                        <span className='truncate text-sm font-medium leading-none'>
                          {model.name}
                        </span>
                        {isFreeModel(model) && (
                          <Badge variant='secondary' className='h-4 px-1 text-[10px]'>FREE</Badge>
                        )}
                      </div>

                      <p className='line-clamp-2 text-xs text-muted-foreground'>
                        {model.description}
                      </p>

                      <div className='flex items-center gap-3 text-[10px] text-muted-foreground'>
                        <span>Context: {formatContextLength(model.context_length)}</span>
                        <span>•</span>
                        <span className='capitalize'>{model?.architecture?.modality ?? 'text'}</span>
                      </div>
                    </div>

                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='h-6 w-6 shrink-0 p-0'
                      onClick={(e) => openModelDetails(model, e)}
                    >
                      <Info className='h-3.5 w-3.5' />
                      <span className='sr-only'>View details</span>
                    </Button>
                  </div>
                )
              })
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className='max-h-[80vh] max-w-2xl overflow-hidden'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <Sparkles className='h-5 w-5' />
              {selectedForDetails?.name ?? 'Model details'}
            </DialogTitle>
            <DialogDescription>Detailed information about this AI model</DialogDescription>
          </DialogHeader>

          <ScrollArea className='h-[400px] pr-4'>
            {selectedForDetails && (
              <div className='space-y-6'>
                <div>
                  <h3 className='mb-2 text-sm font-semibold'>Description</h3>
                  <p className='text-sm leading-relaxed text-muted-foreground'>
                    {selectedForDetails.description}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className='mb-3 text-sm font-semibold'>Context & Capabilities</h3>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <p className='text-xs text-muted-foreground'>Context Length</p>
                      <p className='text-sm font-medium'>
                        {formatContextLength(selectedForDetails.context_length)} tokens
                      </p>
                    </div>

                    <div className='space-y-1'>
                      <p className='text-xs text-muted-foreground'>Max Completion Tokens</p>
                      <p className='text-sm font-medium'>
                        {formatContextLength(selectedForDetails.top_provider?.max_completion_tokens)} tokens
                      </p>
                    </div>

                    <div className='space-y-1'>
                      <p className='text-xs text-muted-foreground'>Modality</p>
                      <p className='text-sm font-medium'>
                        {selectedForDetails.architecture?.modality ?? 'text'}
                      </p>
                    </div>

                    <div className='space-y-1'>
                      <p className='text-xs text-muted-foreground'>Tokenizer</p>
                      <p className='text-sm font-medium'>
                        {selectedForDetails.architecture?.tokenizer ?? 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className='mb-3 text-sm font-semibold'>Supported Modalities</h3>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <p className='text-xs text-muted-foreground'>Input Modalities</p>
                      <div className='flex flex-wrap gap-2'>
                        {(selectedForDetails.architecture?.input_modalities ?? []).map((modality) => (
                          <Badge key={modality} variant='outline' className='text-xs'>
                            {modality}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <p className='text-xs text-muted-foreground'>Output Modalities</p>
                      <div className='flex flex-wrap gap-2'>
                        {(selectedForDetails.architecture?.output_modalities ?? []).map((modality) => (
                          <Badge key={modality} variant='outline' className='text-xs'>
                            {modality}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className='mb-3 text-sm font-semibold'>Pricing</h3>
                  {isFreeModel(selectedForDetails) ? (
                    <div className='flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 p-3'>
                      <Badge variant='secondary' className='bg-green-500/20'>FREE</Badge>
                      <p className='text-sm text-muted-foreground'>This model is completely free to use.</p>
                    </div>
                  ) : (
                    <div className='grid grid-cols-2 gap-3'>
                      {Object.entries(selectedForDetails.pricing ?? {}).map(([key, value]) => {
                        const numericValue = Number(value)
                        if (!Number.isFinite(numericValue) || numericValue <= 0) return null

                        return (
                          <div key={key} className='space-y-1'>
                            <p className='text-xs capitalize text-muted-foreground'>{key.replace('_', ' ')}</p>
                            <p className='text-sm font-medium'>${numericValue}</p>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <h3 className='mb-3 text-sm font-semibold'>Provider Information</h3>
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm text-muted-foreground'>Content Moderation</span>
                      <Badge variant={selectedForDetails.top_provider?.is_moderator ? 'default' : 'secondary'}>
                        {selectedForDetails.top_provider?.is_moderator ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className='mb-2 text-sm font-semibold'>Model ID</h3>
                  <code className='block break-all rounded bg-muted px-2 py-1 text-xs'>
                    {selectedForDetails.id}
                  </code>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}

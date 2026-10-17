"use client"
import React from 'react'
import { ModeToggle } from '../../../components/ui/mode-toggle'
const Header = () => {
  return (
    <header className='flex h-14 w-full shrink-0 items-center justify-end border-b border-border bg-sidebar px-4 py-2'>
      <ModeToggle/>
    </header>
  )
}

export default Header

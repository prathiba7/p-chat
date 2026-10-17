"use client"
import React, { useState } from 'react'
import { Sunrise, Sunset } from 'lucide-react'
import { useTheme } from "next-themes"
import { Button } from '@/components/ui/button'


export const ModeToggle = () => {
    const {theme, setTheme} = useTheme()
    console.log('THEME',theme)
    return (
        <Button variant={"ghost"} size={"icon"} onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? <Sunset className='size-5' /> : <Sunrise size={"size-5"} />}
        </Button>
    )
}
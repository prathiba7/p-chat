"use client"
import { useQuery } from "@tanstack/react-query"

export const useAIModels = () => {
    return useQuery({
        queryKey: ["ai-models"],
        queryFn: async () => {
            const res = await fetch("/api/ai/get-models")

            if (!res.ok) {
                throw new Error("Failed to load AI models")
            }

            return res.json()
        }
    })
}
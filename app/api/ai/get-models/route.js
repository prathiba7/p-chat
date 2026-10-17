import { success } from "better-auth"
import {NextResponse} from "next/server"


export async function GET(req){
    try{
        const response=await fetch("https://openrouter.ai/api/v1/models",{
            method:"GET",
            headers:{
                "Authorization":   `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type":"application/json"
            }
        })

        if(!response.ok){
            throw new Error(`Openrouter API Error:${response.status}`)
        }

        const data=await response.json()
        const freeModels = Array.isArray(data?.data) ? data.data.filter(model => {
            const promptPrice=parseFloat(model.pricing?.prompt || '0')
            const completionprice=parseFloat(model.pricing?.completion || '0')
            return promptPrice===0 && completionprice===0
        }) : []

        const formattedModels = freeModels.map((model)=>({
            id:model.id,
            name: model.name,
            description : model.description,
            context_length:model.context_length,
            architecture:model.architecture,
            pricing:model.pricing,
            top_provider:model.top_provider
        }))
        return NextResponse.json({
            models:formattedModels
        })
    }catch(err){
            console.log('ERROR from fetching data', err)
            return NextResponse.json({
                success:false,
                error: err?.message || "Failed to fetch free models"
            },{status:500})
    }
}
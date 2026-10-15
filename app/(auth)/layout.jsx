import { headers } from 'next/headers';
import {auth} from '../../lib/auth'
import React from "react";
import { redirect } from 'next/navigation';



const AuthLayout = async({children})=>{

    const session =await auth.api.getSession({
        headers: await headers()
    })

    if(session){
        return redirect("/")
    }
    return(
        <>
        {children}
        </>
    )
    

}

export default AuthLayout
"use server"
import {cookies} from "next/headers"

export default async function setLanguageValue(value:string){
    const cookieStore= await cookies();
    cookieStore.set("language",value)
}
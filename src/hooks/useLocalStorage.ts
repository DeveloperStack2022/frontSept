import {useState} from 'react'

export const useLocalStorage = () => {
    const setItem = (key:string,value:any) => {
        localStorage.setItem(key,value)
    }

    const getItem = (key:string) => {
        const value = localStorage.getItem(key) as string
        return value
    }

    const removeItem = (key:string) => {
        localStorage.removeItem(key)
    }

    return {setItem,getItem,removeItem}
}
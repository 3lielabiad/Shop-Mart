"use client"
import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type cartIconProps = {
    serverCartNum: number
    cartId: string
}

export default function CartIcon({ serverCartNum, cartId }: cartIconProps) {
    const [cartnum, setCartNum] = useState(serverCartNum)
    useEffect(()=>{

        if (cartId) {
            localStorage.setItem("cartId", cartId)}
        function handler(e: CustomEvent) {
            setCartNum(e.detail)
        }
        window.addEventListener('cartUpdate',handler as EventListener)
        return () => {
            window.removeEventListener(',cartUpdate', handler as EventListener)
        }
        } , [cartId])
    
    return <>
        <Link href="/cart" className="relative cursor-pointer">
            <ShoppingCartIcon className="size-6 text-inherit" />
            <span className="absolute -top-2 start-5/6 text-xs size-4 bg-accent-foreground text-accent flex justify-center items-center rounded-full">
                {cartnum}
            </span>
        </Link>
    </>
}
"use client"
import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type cartIconProps = {
    serverCartNum: number
    cartId: string
}

export default function CartIcon({ serverCartNum, cartId }: cartIconProps) {
    if (cartId) {
        localStorage.setItem("cartId", cartId)
    }
    const [cartnum, setCartNum] = useState(serverCartNum)

    useEffect(() => {

        function handler(e: CustomEvent) {

            setCartNum(e.detail)
        }
        window.addEventListener('cartUpdate', handler as EventListener)

    }, [])

    return <>
        <Link href="/cart" className="relative cursor-pointer">
            <ShoppingCartIcon className="size-6 text-inherit" />
            <span className="absolute -top-2 start-5/6 text-xs size-4 bg-accent-foreground text-accent flex justify-center items-center rounded-full">
                {cartnum}
            </span>
        </Link>
    </>
}
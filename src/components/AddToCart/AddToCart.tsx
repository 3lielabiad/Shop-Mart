"use client"
import React, { useState } from 'react'
import { CardFooter } from '../ui/card'
import { Heart, Loader2, ShoppingCart } from 'lucide-react'
import { Button } from '../ui/button'
import { CartRes } from '@/interfaces/CartInterfaces'
import toast from 'react-hot-toast'
import { AddToCartAction } from '@/actions/addtoCart.action'
import { useRouter } from 'next/navigation'

export default function AddToCart({ productId }: { productId: string }) {

    const [isLoading, setLoading] = useState(false);
    const router = useRouter()
    async function addToCart(productId: string) {

        setLoading(true)
        try{

            const data: CartRes | null = await AddToCartAction(productId)
            if (!data){
                router.push('/login')
                return
            }
            
        
        toast.success(data.message +'')
        
            window.dispatchEvent(new CustomEvent('cartUpdate' , {detail: data.numOfCartItems}))
        }
        catch (error) {
               console.error(error)
               toast.error('something went wrong')
            }finally{
                setLoading(false)
            }
        }
    return <>
        <CardFooter className="gap-2">

            <Button onClick={() => addToCart(productId)} className="grow gap-2">
                {isLoading ? <Loader2 className="animate-spin"/> : <ShoppingCart/>} Add To Cart</Button>
            <Heart />
        </CardFooter>



    </>
}

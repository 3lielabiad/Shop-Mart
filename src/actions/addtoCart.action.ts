"use server"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { CartRes, shippingAddress } from '@/interfaces/CartInterfaces';


export async function AddToCartAction(productId: string) {

    const session = await getServerSession(authOptions)
    if (!session) return null

        const responce = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            method: 'post',
            body: JSON.stringify({ productId }),
            headers: {
                token: session.token as string,
                
                "Content-Type": "application/json"
                
            }
        })
        if (!responce.ok) {
            throw new Error('failed to add to cart')
        }
        const data: CartRes = await responce.json();
        
        return data
    }

    
export async function checkOutAction(cartId: string, shippingAddress :shippingAddress) {

    const session = await getServerSession(authOptions)
    if (!session) return null

        const responce = await fetch('https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000', {
            method: 'post',
            body: JSON.stringify({ shippingAddress }),
            headers: {
                token: session.token as string,
                
                "Content-Type": "application/json"
                
            }
        })
        const data: CartRes = await responce.json();
        
        return data
    }

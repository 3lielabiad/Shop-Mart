"use client"
import { clearCartAction, deleteProductAction, updateProductAction } from "@/actions/cartActions"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/Helpers/formateCurrency"
import { CartIteam, CartRes } from "@/interfaces/CartInterfaces"
import { Divide, Loader2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import CheckOutSession from "../CheckOutSession/CheckOutSession"

interface CartProps {
    cartData: CartRes |null
}

export default function Cart({ cartData }: { cartData: CartRes | null }) {

    const [cart, setCart] = useState<CartRes | null>(cartData || null)
    const [loadingId, setLoadingId] = useState<string | null>(null);
    useEffect(()=>{
        window.dispatchEvent(
            new CustomEvent('cartUpdate', { detail: cart?.numOfCartItems ?? 0 })
        )
    },[cart])




    async function deleteCartProduct(productId: string) {
        setLoadingId(productId)
        const response: CartRes = await deleteProductAction(productId);
        if (response.status == 'success') {
            setCart(response)
            dispatchEvent(new CustomEvent('cartUpdate', { detail: response.numOfCartItems }))
        }
        setLoadingId(null)
    }

    async function updateProductCount(productId: string, count: number) {
        setLoadingId(productId)
        const response: CartRes = await updateProductAction(productId, count);
        if (response.status == 'success') {
            setCart(response);
            toast.success('product count updated')
        }
        setLoadingId(null)
    }

    async function clearCart() {
        setLoadingId('clear')
        const response: CartRes = await clearCartAction();
        if (response.message == 'success') {
            setCart(null);
        }
        setLoadingId(null)
    }

    return <>
        {cart ?

            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
                <p className="text-muted-foreground mt-1">
                    {cart.numOfCartItems} items in your cart
                </p>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6">

                    <div className="lg:col-span-2 space-y-4">
                        {cart.data.products.map((item) =>
                            <div key={item._id} className="flex gap-4 relative rounded-xl border p-4 shadow-sm bg-card">

                                {loadingId == item.product._id && <div className="absolute inset-0 bg-white/80 flex justify-center items-center">
                                    <Loader2 className="animate-spin" />
                                </div>
                                }
                                <img
                                    src={item.product.imageCover}
                                    alt={item.product.title}
                                    className="w-24 h-24 rounded-lg object-cover md:h-28"
                                />

                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                        <div className="min-w-0">
                                            <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                                                {item.product.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {item.product.brand.name} . {item.product.category.name}
                                            </p>
                                        </div>

                                        <div className="text-right shrink-0">
                                            <div className="font-semibold">
                                                {formatCurrency(item.price)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <button
                                                disabled={item.count == 1}
                                                aria-label="decrease"
                                                className="size-8 rounded-lg border hover:bg-accent"
                                                onClick={() => updateProductCount(item.product._id, item.count - 1)}
                                            >
                                                -
                                            </button>
                                            <span className="w-6 text-center font-medium">
                                                {item.count}
                                            </span>
                                            <button
                                                disabled={item.count == item.product.quantity}
                                                aria-label="increase"
                                                className="size-8 rounded-lg border hover:bg-accent"
                                                onClick={() => updateProductCount(item.product._id, item.count + 1)}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            aria-label="remove"
                                            className="text-destructive hover:underline text-sm cursor-pointer flex gap-1 
                                    items-center"
                                            onClick={() => deleteCartProduct(item.product._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>


                    <div className="lg:col-span-1 sticky top-18">
                        <div className="rounded-xl border p-5 shadow-sm">
                            <h2 className="text-lg font-semibold">Order Summary</h2>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Subtotal ({cart.numOfCartItems} items)
                                    </span>
                                    <span className="font-semibold">{formatCurrency(cart.data.totalCartPrice)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Shipping</span>
                                    <span className="text-emerald-600 font-medium">Free</span>
                                </div>
                            </div>

                            <div className="my-4 border-t" />

                            <div className="flex items-center justify-between">
                                <span className="text-base font-semibold">Total</span>
                                <span className="text-base font-bold">{formatCurrency(cart.data.totalCartPrice)}</span>
                            </div>

                            <button className="w-full mt-3 h-11 rounded-xl border hover:bg-accent">
                                Contenue Shopping
                            </button>
                            <CheckOutSession cartId={cartData?.cartId} />
                        </div>
                        <Button onClick={() => clearCart()} variant={"outline"} className='text-destructive hover:text-destrucive mt-auto flex cursor-pointer'> {loadingId == 'clear' && <Loader2 className="animate-spin" />} Clear Cart</Button>
                    </div>
                </div>
            </div>
            :

            <div className="min-h-[60vh] flex justify-center items-center flex-col">
                <h2 className='text-2xl mb-3'>Your Cart IS Empty</h2>
                <Link href={'/products'} className=''>
                    <Button>
                        Add Ones
                    </Button>
                </Link>
            </div>
        }
    </>
}
import AddToCart from '@/components/AddToCart/AddToCart'
import Slider from '@/components/Slider/Slider'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/Helpers/formateCurrency'
import { Product } from '@/interfaces/productinterface'
import { Heart, ShoppingCartIcon, Star, StarHalf } from 'lucide-react'
import { Params } from 'next/dist/server/request/params'
import React from 'react'

export default async function productDetails({ params }: { params: Params }) {

    const { productId } = await params

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/' + productId)

    const { data: product }: { data: Product } = await response.json();

    return <>

        <Card className="grid grid-cols- grid-cols-3 items-center">
            <div className="">

                <Slider images={product.images} title={product.title} />

            </div>
            <div className=" col-span-2 space-y-5 p-4 ">
                <CardHeader className="mt-2">
                    <CardDescription>{product.brand.name}</CardDescription>
                    <CardTitle className="">{product.title}</CardTitle>
                    <CardAction>{product.category.name}</CardAction>
                    <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <div className="flex">
                            <Star className="text-amber-400 fill-amber-400" fill="true" />
                            <Star className="text-amber-400 fill-amber-400" fill="true" />
                            <Star className="text-amber-400 fill-amber-400" fill="true" />
                            <Star className="text-amber-400 fill-amber-400" fill="true" />
                            <StarHalf className="text-amber-400 fill-amber-400" fill="true" />
                        </div>
                        <p>{product.ratingsAverage}</p>
                    </div>
                    <p>{formatCurrency(product.price)}</p>
                </CardContent>
                <AddToCart productId={product.id} />
            </div>
        </Card>

    </>
}

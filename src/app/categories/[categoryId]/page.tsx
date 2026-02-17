import Slider from '@/components/Slider/Slider'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, StarHalf } from 'lucide-react'
import { formatCurrency } from '@/Helpers/formateCurrency'
import AddToCart from '@/components/AddToCart/AddToCart'
import Image from 'next/image'

export default async function CategoryDetails({ params } : { params : {categoryId : string } }) {
  

    const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories')

    const json = await res.json()

    const category = json.data

    if (!category) {
        return <div>Categorie not found</div>
    }

    return <>

        <div className="max-w-xl mx-auto text-center">
            <Image
            src={category.image}
            alt='category.image'
            width={400}
            height={300}
            className="w-full object-cover" />
            <h1 className="text-2xl font-bold mt-4">{category.name}</h1>
        </div>
    </>
}

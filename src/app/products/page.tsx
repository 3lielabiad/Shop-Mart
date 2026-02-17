import { ProductResponse } from '@/interfaces/productinterface';
import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Heart, Link as LinkIcon, Star, StarHalf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AddToCart from '@/components/AddToCart/AddToCart';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { formatCurrency } from '@/Helpers/formateCurrency';
export default async function Products() {

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products');
  const data: ProductResponse = await response.json()


  const session = await getServerSession(authOptions);

  return <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

      {data?.data?.map((product) => <div key={product.id} className="p-2">
        <Card className="overflow-hidden pt-0">
          <Link href={'/products/' + product.id}>
            <div className="-m-1 -mt-6">
              <Image src={product.imageCover} alt={product.title} width={200} height={150} className="relative z-20 w-full object-cover " />

            </div>
            <CardHeader className="mt-2">
              <CardDescription>{product.brand.name}</CardDescription>
              <CardTitle className="line-clamp-1">{product.title}</CardTitle>
              <CardDescription>{product.category.name}</CardDescription>
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
          </Link>
          <AddToCart productId={product._id} />
        </Card>
      </div>)}

    </div>

  </>
}

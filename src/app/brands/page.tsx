import Image from "next/image";import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function BrandsPage() {

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands')

  const { data } = await response.json()


  return <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

      {data.map((brand: any) => (

        <div key={brand._id} className="p-2">

          <Link href={'/brands/${brand._id}'}>
            <div className="border rounded-lg overflow-hidden">
              <Image src={brand.image} alt={brand.name} width={300} height={200} className=" w-full object-cover " />
              <h3 className="p-3 text-center font-semibold">{brand.name}</h3>
            </div>
          </Link>
        </div>))}
    </div>
  </>
}

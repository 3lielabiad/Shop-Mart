import Image from "next/image";import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function CategoriesPage() {

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')

  const { data } = await response.json()


  return <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      {data.map((categories: any) => (

        

          <Link key={categories._id} href={'/categories/${categories._id}'}>
            <div className="border rounded-lg overflow-hidden">
              <Image src={categories.image} alt={categories.name} width={300} height={200} className=" w-full object-cover " />
              <h3 className="p-3 text-center font-semibold">{categories.name}</h3>
            </div>
          </Link>
        ))}
    </div>
  </>
}

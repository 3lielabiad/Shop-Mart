import Slider from '@/components/Slider/Slider'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

export default async function BrandDetails({ params, } : { params : {branId : string } }) {
  

    const res = await fetch('https://ecommerce.routemisr.com/api/v1/brands/${params.brandId}')

    const json = await res.json()

    const brand = json?.data

    if (!brand) {
        return <div>Brand not found</div>
    }

    return <>

        <Card className="grid grid-cols-3 items-center">

                <Slider images={[brand.image]} title={brand.name} />

            <div className=" col-span-2 p-4 ">

                <h2 className="text-xl font-bold">{brand.name}</h2>

            </div>
        </Card>

    </>
}

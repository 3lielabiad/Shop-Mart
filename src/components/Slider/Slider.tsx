"use client"

import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'

interface SliderProps {
    images: string
    title: string
}


export default function Slider({ images, title }: {images:string [], title :string}) {


    return <>
        <Carousel opts={{ loop: true }} plugins={[
            Autoplay({delay:3000}),]}>
                
            <CarouselContent>
                {images.map((img , index) => (
                    
                    <CarouselItem key={index}>
                         <Image src={img} alt={'${title} ${index+1}'} width={800}
                         height={400} className="w-full object-cover" />
                    </CarouselItem>
                ))}

            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </>
}                

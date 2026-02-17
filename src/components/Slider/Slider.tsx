"use client"
import React, { useEffect, useRef } from 'react'
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
    image: string[]
    title: string
}


export default function Slider({ images, title }: SliderProps) {


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

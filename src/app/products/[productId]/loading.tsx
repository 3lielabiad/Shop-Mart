import React from 'react'

export default function Loading() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-white mt-1">,
            <div className="text-center">
                {/* techmart logo */}
                <div className="w-12 h-12 bg-black flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-2xl">S</span>
                </div>
                <span className="text-3xl font-bold text-black">ShopMart</span>
            </div>

            {/* spinner */}
            <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animation-spin"></div>
                <div className="w-12 h-12 border-4 border-gray-100 border-b-gray-400 rounded-full animation-spin left-1/2 transform-translate-x-1/2 mx-2"></div>
            </div>
        </div>
    )
}

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderProps {
    images: string[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
}

const Slider: React.FC<SliderProps> = ({
    images,
    autoPlay = true,
    autoPlayInterval = 5000,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);

    useEffect(() => {
        if (!isAutoPlay || images.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [isAutoPlay, images.length, autoPlayInterval]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index % images.length);
        setIsAutoPlay(false);
        setTimeout(() => setIsAutoPlay(autoPlay), 1000);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setIsAutoPlay(false);
        setTimeout(() => setIsAutoPlay(autoPlay), 1000);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsAutoPlay(false);
        setTimeout(() => setIsAutoPlay(autoPlay), 1000);
    };

    if (images.length === 0) {
        return <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">No images</div>;
    }

    return (
        <div className="relative w-full bg-black rounded-lg overflow-hidden">
            {/* Main Image Container */}
            <div className="relative w-full aspect-video">
                <div className="absolute inset-0 overflow-hidden">
                    <Image
                        src={images[currentIndex]}
                        alt={`Slide ${currentIndex + 1}`}
                        fill
                        className="object-cover transition-opacity duration-500"
                        priority
                        onMouseEnter={() => setIsAutoPlay(false)}
                        onMouseLeave={() => setIsAutoPlay(autoPlay)}
                    />
                </div>

                {/* Previous Button */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-full transition duration-300 hover:scale-110 md:left-6"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Next Button */}
                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-full transition duration-300 hover:scale-110 md:right-6"
                    aria-label="Next slide"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Dots Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-3 rounded-full transition duration-300 ${index === currentIndex
                                ? 'bg-white w-8'
                                : 'bg-violet-300 w-3 hover:bg-violet-400'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Slide Counter */}
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    );
};

export default Slider;

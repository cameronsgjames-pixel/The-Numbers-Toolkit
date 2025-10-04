import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Create infinite loop by duplicating testimonials
  const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials];
  const startIndex = testimonials.length;

  // Auto-scroll every 4 seconds for smoother loop
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= testimonials.length * 2) {
            // Reset to middle section for seamless loop
            return startIndex;
          }
          return nextIndex;
        });
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [testimonials.length, isHovered, startIndex]);

  // Reset to middle section when reaching the end
  useEffect(() => {
    if (currentIndex >= testimonials.length * 2) {
      setTimeout(() => {
        setCurrentIndex(startIndex);
      }, 700);
    }
  }, [currentIndex, testimonials.length, startIndex]);

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      if (newIndex < 0) {
        return testimonials.length * 2 - 1;
      }
      return newIndex;
    });
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex >= testimonials.length * 2) {
        return 0;
      }
      return newIndex;
    });
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === (currentIndex % testimonials.length)) return;
    setIsTransitioning(true);
    setCurrentIndex(index + startIndex);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div 
      className="relative max-w-5xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main testimonial display */}
      <div className="overflow-hidden rounded-3xl shadow-2xl">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {infiniteTestimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <Card className="border-0 shadow-none bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 mx-2">
                <CardContent className="p-8 sm:p-12 text-center relative">
                  {/* Background decoration */}
                  <div className="absolute bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-50"></div>
                  
                  {/* Quote icon */}
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-8 shadow-lg">
                      <Quote className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Rating stars */}
                    <div className="flex justify-center mb-6">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    {/* Testimonial content */}
                    <blockquote className="text-lg sm:text-xl lg:text-2xl text-slate-800 leading-relaxed mb-8 font-medium">
                      "{testimonial.content}"
                    </blockquote>
                    
                    {/* Author info */}
                    <footer className="text-center">
                      <cite className="font-bold text-slate-900 not-italic text-lg block mb-2">
                        {testimonial.name}
                      </cite>
                      <p className="text-slate-600 text-sm">{testimonial.role}</p>
                      <p className="text-slate-500 text-sm">{testimonial.company}</p>
                    </footer>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white hover:shadow-2xl z-10 border-0 transition-all duration-300 hover:scale-110"
        onClick={goToPrevious}
        disabled={isTransitioning}
      >
        <ChevronLeft className="w-5 h-5 text-slate-700" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white hover:shadow-2xl z-10 border-0 transition-all duration-300 hover:scale-110"
        onClick={goToNext}
        disabled={isTransitioning}
      >
        <ChevronRight className="w-5 h-5 text-slate-700" />
      </Button>

      {/* Enhanced dots indicator */}
      <div className="flex justify-center space-x-3 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === (currentIndex % testimonials.length)
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 scale-125 shadow-lg' 
                : 'bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
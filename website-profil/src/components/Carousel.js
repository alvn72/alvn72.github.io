// Carousel.js
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export function Carousel({ items, aspectRatio = '4/3' }) {
  const [current, setCurrent] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return (
    <div
      className="w-full rounded-xl bg-zinc-100 dark:bg-zinc-800/40 animate-pulse"
      style={{ aspectRatio }}
    />
  )

  const handleNext = () => setCurrent((i) => (i === items.length - 1 ? 0 : i + 1))
  const handlePrev = () => setCurrent((i) => (i === 0 ? items.length - 1 : i - 1))

  return (
    <div className="relative w-full flex flex-col items-center py-6">
      {/* 3D Carousel Container */}
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] flex justify-center items-center overflow-visible">
        {items.map((item, index) => {
          // Calculate relative position to current
          let offset = index - current;
          
          // Wrap around logic for infinite loop effect
          if (offset < -Math.floor(items.length / 2)) {
            offset += items.length;
          } else if (offset > Math.floor(items.length / 2)) {
            offset -= items.length;
          }
          
          // Only show 1 item on each side
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 1;
          
          if (!isVisible) return null;

          // Determine styles based on offset
          const absOffset = Math.abs(offset);
          let widthPercent = 60;  // active item width
          let translateX = 0;
          let zIndex = 50;
          let opacity = 1;
          
          if (absOffset === 1) {
            widthPercent = 35;
            translateX = offset * 100;
            zIndex = 40;
            opacity = 0.75;
          }

          return (
            <div
              key={index}
              className="absolute top-0 bottom-0 left-0 right-0 m-auto transition-all duration-500 ease-out cursor-pointer rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
              style={{
                transform: `translateX(${translateX}%)`,
                zIndex: zIndex,
                opacity: opacity,
                width: `${widthPercent}%`,
                maxWidth: isActive ? '450px' : '225px',
                aspectRatio: aspectRatio,
                height: 'fit-content'
              }}
              onClick={() => {
                if (offset === -1 || (offset > 1 && current === 0 && index === items.length - 1)) handlePrev();
                else if (offset === 1 || (offset < -1 && current === items.length - 1 && index === 0)) handleNext();
                else setCurrent(index);
              }}
            >
              <div className="relative w-full h-full">
                 {/* Dark overlay for inactive items */}
                 <div className={`absolute inset-0 z-10 transition-colors duration-500 pointer-events-none ${!isActive ? 'bg-black/30 dark:bg-black/50' : 'bg-transparent'}`} />
                 
                 <Image
                    src={item.src}
                    alt={item.alt || ''}
                    fill
                    className="object-cover"
                  />
              </div>
            </div>
          )
        })}
      </div>

      {/* dots pagination */}
      <div className="flex gap-2.5 mt-8 items-center z-10">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ring-1 ring-offset-2 ring-offset-transparent dark:ring-offset-transparent outline-none ${
              i === current
                ? 'w-2 h-2 bg-zinc-900 dark:bg-zinc-100 ring-zinc-900 dark:ring-zinc-100'
                : 'w-1.5 h-1.5 bg-transparent ring-zinc-900 dark:ring-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-700'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Caption Area (matching the design) */}
      <div className="mt-8 flex flex-col items-center text-center px-4 w-full z-10">
         <div className="flex items-center w-full justify-center gap-3 md:gap-6 mb-3">
           <div className="h-px bg-zinc-800 dark:bg-zinc-200 w-12 md:w-24 relative hidden sm:block">
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-t-transparent border-l-[5px] border-l-zinc-800 dark:border-l-zinc-200 border-b-[3px] border-b-transparent"></div>
           </div>
           
           <h4 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-wide text-balance">
             {items[current].caption}
           </h4>
           
           <div className="h-px bg-zinc-800 dark:bg-zinc-200 w-12 md:w-24 relative hidden sm:block">
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-t-transparent border-r-[5px] border-r-zinc-800 dark:border-r-zinc-200 border-b-[3px] border-b-transparent"></div>
           </div>
         </div>
         
         <div className="flex items-center justify-center mt-1">
            <div className="relative inline-block px-12 py-1">
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest opacity-80">
                {items[current].alt}
              </span>
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-zinc-800 dark:bg-zinc-200">
                 <div className="absolute -left-[3px] -bottom-[2.5px] w-1.5 h-1.5 rotate-45 bg-zinc-800 dark:bg-zinc-200"></div>
                 <div className="absolute -right-[3px] -bottom-[2.5px] w-1.5 h-1.5 rotate-45 bg-zinc-800 dark:bg-zinc-200"></div>
              </div>
            </div>
         </div>
      </div>
    </div>
  )
}
// Carousel.js
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Carousel({ items, aspectRatio = '16/9' }) {
  const [current, setCurrent] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const prev = () => setCurrent((i) => (i === 0 ? items.length - 1 : i - 1))
  const next = () => setCurrent((i) => (i === items.length - 1 ? 0 : i + 1))

  if (!mounted) return (
    <div
      className="w-full rounded-xl bg-zinc-100 dark:bg-zinc-800/40 animate-pulse"
      style={{ aspectRatio }}
    />
  )

  return (
    <div className="relative w-full group">

      {/* wrapper gambar — pakai glass sebagai frame */}
      <div
        className="relative w-full overflow-hidden rounded-xl glass dark:glass-dark"
        style={{ aspectRatio }}
      >
        <Image
          src={items[current].src}
          alt={items[current].alt || ''}
          fill
          className="object-cover transition-opacity duration-300"
        />

        {/* caption — glass di atas gambar */}
        {items[current].caption && (
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 glass dark:glass-dark">
            <p className="text-sm text-zinc-800 dark:text-zinc-200">
              {items[current].caption}
            </p>
          </div>
        )}
      </div>

      {/* tombol prev — glass */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full
          glass dark:glass-dark
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          text-zinc-800 dark:text-zinc-200"
      >
        <ChevronLeft size={18} />
      </button>

      {/* tombol next — glass */}
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full
          glass dark:glass-dark
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          text-zinc-800 dark:text-zinc-200"
      >
        <ChevronRight size={18} />
      </button>

      {/* dots & counter — glass sebagai container */}
      <div className="flex flex-col items-center gap-1 mt-3 py-2 px-4 rounded-full glass dark:glass-dark w-max mx-auto">
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-200 ${
                i === current
                  ? 'w-4 h-1.5 bg-zinc-900 dark:bg-zinc-50'
                  : 'w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {current + 1} / {items.length}
        </span>
      </div>

    </div>
  )
}
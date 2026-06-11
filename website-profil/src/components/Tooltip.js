'use client'

import { useState, useEffect } from 'react'

export function Tooltip({ children, text, position = 'top', maxWidth = 200 }) {
  const [visible, setVisible] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)

  // 1. Pantau ukuran layar saat di-resize
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)
      const handleResize = () => setWindowWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 2. Tentukan posisi aktif berdasarkan objek atau string biasa
  const getActivePosition = () => {
    // Jika user hanya memasukkan string biasa (misal: position="top")
    if (typeof position === 'string') return position

    // Jika user memasukkan objek responsive (misal: { base: 'bottom', md: 'right' })
    const { base = 'top', sm, md, lg } = position

    if (windowWidth >= 1024 && lg) return lg // Large screens
    if (windowWidth >= 768 && md) return md   // Medium screens (Tablet/Laptop)
    if (windowWidth >= 640 && sm) return sm   // Small screens
    return base                               // Mobile/Default
  }

  const activePosition = getActivePosition()

  // Class posisi murni tanpa prefix responsive, karena JS yang mengaturnya
  const positionClass = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

     {visible && (
  <span
    className={`
      absolute z-50 px-3 py-1.5 text-sm rounded-lg text-foreground
      transition-opacity duration-200
      
      /* 🌟 PERUBAHAN DI SINI 🌟 */
      /* Default (Mobile): Latar solid & border biasa */
      bg-white dark:bg-slate-800 border border-slate-700/50 text-dark dark:text-white 
       
      /* Screen MD ke atas: Kembalikan ke efek glassmorphism kamu */
      md:glass md:dark:glass-dark md:border-none
      
      ${positionClass[activePosition] || positionClass.top}
    `}
    style={{
      maxWidth: `${maxWidth}px`,
      width: 'max-content',
    }}
  >
    {text}
  </span>
)}
    </span>
  )
}
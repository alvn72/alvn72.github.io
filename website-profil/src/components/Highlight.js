'use client'

import { useEffect, useRef } from 'react'

export function Highlight({ children, delay = 0, duration = 500 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.setProperty('--hl-duration', `${duration}ms`)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // masuk viewport — jalankan animasi
            setTimeout(() => {
              el.classList.add('is-visible')
            }, delay)
          } else {
            // keluar viewport — reset animasi
            el.classList.remove('is-visible')
          }
        })
      },
      {
        threshold: 0.5,
      }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [delay, duration])

  return (
    <span ref={ref} className="highlight" style={{ color: 'var(--background)' }}>
      {children}
    </span>
  )
}
'use client'

import { useEffect, useRef } from 'react'

export function Highlight({ children, delay = 0, duration = 500 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.setProperty('--hl-duration', `${duration}ms`)

    const timer = setTimeout(() => {
      el.classList.add('is-visible')
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, duration])

  return (
    <span ref={ref} className="highlight" style={{ color: 'var(--background)' }}>
      {children}
    </span>
  )
}
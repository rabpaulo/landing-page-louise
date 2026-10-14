import { m, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  scale?: boolean
  duration?: number
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 28,
  scale = false,
  duration = 0.65,
}: RevealProps) {
  const reduce = useReducedMotion()

  const getInitial = () => {
    if (reduce) return false

    const initial: { opacity: number; x?: number; y?: number; scale?: number } = { opacity: 0 }

    if (direction === 'up') initial.y = distance
    if (direction === 'down') initial.y = -distance
    if (direction === 'left') initial.x = distance
    if (direction === 'right') initial.x = -distance
    if (scale) initial.scale = 0.96

    return initial
  }

  const getAnimate = () => {
    const animate: { opacity: number; x?: number; y?: number; scale?: number } = { opacity: 1 }

    if (direction !== 'none') {
      animate.x = 0
      animate.y = 0
    }
    if (scale) animate.scale = 1

    return animate
  }

  return (
    <m.div
      className={className}
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduce ? 0 : duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </m.div>
  )
}

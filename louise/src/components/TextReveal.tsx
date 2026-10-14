import { m, useReducedMotion } from 'motion/react'
import type { ElementType, ReactNode } from 'react'

interface TextRevealProps {
  children?: ReactNode
  text?: string
  as?: ElementType
  className?: string
  id?: string
  delay?: number
  staggerDelay?: number
}

export function TextReveal({
  children,
  text,
  as: Component = 'span',
  className = '',
  id,
  delay = 0,
  staggerDelay = 0.035,
}: TextRevealProps) {
  const reduce = useReducedMotion()

  // If text is provided, split into words for kinetic animation
  if (text) {
    const words = text.split(' ')

    if (reduce) {
      return (
        <Component className={className} id={id}>
          {text}
        </Component>
      )
    }

    return (
      <Component className={className} id={id}>
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden align-top mr-[0.26em] last:mr-0"
          >
            <m.span
              className="inline-block"
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: delay + index * staggerDelay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </m.span>
          </span>
        ))}
      </Component>
    )
  }

  // If children are provided, animate children block
  if (reduce) {
    return (
      <Component className={className} id={id}>
        {children}
      </Component>
    )
  }

  return (
    <Component className={className} id={id}>
      <m.span
        className="inline-block"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.65,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </m.span>
    </Component>
  )
}

import { m, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return <m.div className={className} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: reduce ? 0 : .6, ease: [.16, 1, .3, 1] }}>{children}</m.div>
}

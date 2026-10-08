'use client'

import { IconContext } from '@phosphor-icons/react'
import { LazyMotion } from 'motion/react'
import { CartProvider } from '../src/cart/CartProvider'
import App from '../src/App'

const loadMotionFeatures = () => import('../src/motion-features').then(module => module.default)

export default function Home() {
  return (
    <IconContext.Provider value={{ weight: 'light' }}>
      <LazyMotion features={loadMotionFeatures} strict>
        <CartProvider><App /></CartProvider>
      </LazyMotion>
    </IconContext.Provider>
  )
}

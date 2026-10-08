'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { ArrowClockwise, ArrowRight, ArrowUpRight, Check, MapPin, Package, Truck } from '@phosphor-icons/react'
import { Header } from './components/Header'
import { CategoryShowcase } from './components/CategoryShowcase'
import { Collection } from './components/Collection'
import { WholesaleSection } from './components/WholesaleSection'
import { BrandStory } from './components/BrandStory'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { WebMCP } from './components/WebMCP'
import { Chatbot } from './components/Chatbot'
import type { CategoryFilter } from './types'

export default function App() {
  const [notice, setNotice] = useState('')
  const [category, setCategory] = useState<CategoryFilter>('Todos')
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(''), 4200)
    return () => window.clearTimeout(timer)
  }, [notice])

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <m.div initial={false} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduce ? 0 : .55, ease: [.16, 1, .3, 1] }}>
              <p className="eyebrow">LOUISE LINGERIE <span aria-hidden="true">·</span> FORTALEZA</p>
              <h1 id="hero-title">Moda íntima para seus momentos — e para o seu negócio.</h1>
              <p className="hero-description">Conjuntos, peças para o dia a dia e opções para dormir. Conheça a Louise e encontre o caminho certo para comprar no varejo ou abastecer sua loja.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#categorias">Explorar categorias <ArrowRight size={18} aria-hidden="true" /></a>
                <a className="text-link" href="#atacado">Comprar para revender <ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
              <div className="hero-proof"><MapPin size={16} aria-hidden="true" /><span>Uma operação de moda íntima com presença em Fortaleza</span></div>
            </m.div>
          </div>
          <figure className="hero-visual">
            <img src="/images/hero.webp" srcSet="/images/hero-720.webp 720w, /images/hero-960.webp 960w, /images/hero.webp 1400w" sizes="(max-width: 767px) 100vw, 52vw" alt="Conjunto de lingerie vinho com renda floral, fotografado sobre tecido claro." width="1400" height="933" fetchPriority="high" />
            <figcaption><span>Louise Lingerie</span><span>Uma prévia de experiência digital</span></figcaption>
          </figure>
        </section>

        <div className="business-strip" aria-label="Informações apresentadas no site da Louise">
          <span><Package size={21} aria-hidden="true" /><span>Moda íntima no atacado</span></span>
          <span><Truck size={21} aria-hidden="true" /><span>Envios para todo o Brasil</span></span>
          <span><ArrowClockwise size={19} aria-hidden="true" /><span>Reposições frequentes</span></span>
        </div>

        <CategoryShowcase onSelect={setCategory} />
        <Collection category={category} onCategoryChange={setCategory} onAdded={name => setNotice(name + ' adicionado à sua sacola demonstrativa.')} />
        <WholesaleSection />
        <BrandStory />
        <FAQ />
      </main>
      <Footer />
      <div aria-live="polite" aria-atomic="true" className="toast-region">
        <AnimatePresence>{notice && <m.div className="add-notice" key={notice} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}><Check size={19} aria-hidden="true" />{notice}</m.div>}</AnimatePresence>
      </div>
      <WebMCP />
      <Chatbot />
    </>
  )
}

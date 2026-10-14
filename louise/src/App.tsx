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
import { ProgressiveImage } from './components/ProgressiveImage'
import { Reveal } from './components/Reveal'
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
            <div>
              <m.p
                className="eyebrow"
                initial={reduce ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                MARÉ ÍNTIMA <span aria-hidden="true">·</span> LINGERIE
              </m.p>
              <m.h1
                id="hero-title"
                initial={reduce ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Moda íntima para seus momentos <em>e para o seu negócio.</em>
              </m.h1>
              <m.p
                className="hero-description"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                Conjuntos, peças para o dia a dia e opções para dormir. Conheça a Maré Íntima e encontre o caminho certo para comprar no varejo ou abastecer sua loja.
              </m.p>
              <m.div
                className="hero-actions"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <m.a
                  className="button button-primary"
                  href="#categorias"
                  whileHover={reduce ? undefined : { scale: 1.025 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                >
                  Explorar categorias <ArrowRight size={18} aria-hidden="true" />
                </m.a>
                <m.a
                  className="text-link"
                  href="#atacado"
                  whileHover={reduce ? undefined : { x: 3 }}
                >
                  Comprar para revender <ArrowUpRight size={16} aria-hidden="true" />
                </m.a>
              </m.div>
              <m.div
                className="hero-proof"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduce ? 0 : 0.7, delay: 0.42 }}
              >
                <MapPin size={16} aria-hidden="true" />
                <span>Uma marca fictícia de moda íntima, criada para esta demonstração</span>
              </m.div>
            </div>
          </div>
          <figure className="hero-visual">
            <ProgressiveImage
              src="/images/hero.webp"
              srcSet="/images/hero-720.webp 720w, /images/hero-960.webp 960w, /images/hero.webp 1400w"
              sizes="(max-width: 767px) 100vw, 52vw"
              alt="Conjunto de lingerie vinho com renda floral, fotografado sobre tecido claro."
              width={1400}
              height={933}
              priority
              fetchPriority="high"
              wrapperClassName="hero-progressive-wrap"
            />
            <figcaption>
              <span>Maré Íntima</span>
              <span>Uma prévia de experiência digital</span>
            </figcaption>
          </figure>
        </section>

        <div className="business-strip" aria-label="Destaques da marca">
          <Reveal delay={0.05} direction="up" className="business-item">
            <Package size={21} aria-hidden="true" />
            <span>Moda íntima no atacado</span>
          </Reveal>
          <Reveal delay={0.15} direction="up" className="business-item">
            <Truck size={21} aria-hidden="true" />
            <span>Envios para todo o Brasil</span>
          </Reveal>
          <Reveal delay={0.25} direction="up" className="business-item">
            <ArrowClockwise size={19} aria-hidden="true" />
            <span>Reposições frequentes</span>
          </Reveal>
        </div>

        <CategoryShowcase onSelect={setCategory} />
        <Collection
          category={category}
          onCategoryChange={setCategory}
          onAdded={name => setNotice(name + ' adicionado à sua sacola demonstrativa.')}
        />
        <WholesaleSection />
        <BrandStory />
        <FAQ />
      </main>
      <Footer />
      <div aria-live="polite" aria-atomic="true" className="toast-region">
        <AnimatePresence>
          {notice && (
            <m.div
              className="add-notice"
              key={notice}
              initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: reduce ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <Check size={19} aria-hidden="true" />
              {notice}
            </m.div>
          )}
        </AnimatePresence>
      </div>
      <WebMCP />
      <Chatbot />
    </>
  )
}

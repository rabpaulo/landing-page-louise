'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { Check, Flower, Heart, Sparkle } from '@phosphor-icons/react'
import { Header } from './components/Header'
import { Collection } from './components/Collection'
import { BrandStory } from './components/BrandStory'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { WebMCP } from './components/WebMCP'
import { Chatbot } from './components/Chatbot'

export default function App() {
  const [notice, setNotice] = useState('')
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(''), 4500)
    return () => window.clearTimeout(timer)
  }, [notice])

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <m.div className="hero-copy" initial={reduce ? false : { y: 14 }} animate={{ y: 0 }} transition={{ duration: .65, ease: [.16, 1, .3, 1] }}>
            <p className="eyebrow">COLEÇÃO ESSÊNCIA</p>
            <h1 id="hero-title">Para sentir.<br />Para ser você.</h1>
            <p className="hero-description">Texturas que abraçam. Detalhes que encantam.<br className="desktop-break" /> Descubra o seu jeito de vestir leveza.</p>
            <a className="button button-primary" href="#colecao">Explorar coleção</a>
          </m.div>
          <div className="hero-visual"><img src="/images/hero.webp" srcSet="/images/hero-720.webp 720w, /images/hero-960.webp 960w, /images/hero.webp 1400w" sizes="(max-width: 767px) 100vw, 51vw" alt="Conjunto de lingerie vinho com renda floral sobre linho rosado, banhado pela luz da janela." width="1400" height="933" fetchPriority="high" /></div>
        </section>
        <div className="values-strip" aria-label="Os detalhes Valenne">
          <span><Flower size={22} aria-hidden="true" /> Cuidado em cada detalhe</span>
          <span><Heart size={22} aria-hidden="true" /> Conforto que acompanha você</span>
          <span><Sparkle size={22} aria-hidden="true" /> Peças para o seu momento</span>
        </div>
        <Collection onAdded={name => setNotice(`${name} adicionado à sua sacola.`)} />
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

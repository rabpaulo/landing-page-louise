import { Flower, Heart, Sparkle } from '@phosphor-icons/react'
import { Reveal } from './Reveal'

export function BrandStory() {
  return (
    <>
      <section className="editorial" aria-labelledby="editorial-title">
        <div className="editorial-image"><img src="/images/campaign.webp" alt="Detalhes de renda vinho sobre tecido de linho rosado iluminado pela janela." width="1400" height="933" loading="lazy" decoding="async" /></div>
        <Reveal className="editorial-copy"><p className="eyebrow">O ENCANTO ESTÁ NOS DETALHES</p><h2 id="editorial-title">Um toque de renda.<br />Um tempo para você.</h2><p>Entre texturas e pequenos rituais, existe uma beleza que começa em como você se sente.</p><a className="text-link" href="#essencia">Conheça nossa essência</a></Reveal>
      </section>
      <section className="brand-story section-container" id="essencia" aria-labelledby="story-title">
        <Reveal className="story-intro"><Flower size={34} aria-hidden="true" /><h2 id="story-title">O que veste você<br />também conta sua história.</h2><p>A Valenne nasce da ideia de que vestir-se é um gesto de cuidado. Da renda ao cetim, cada peça convida você a ser sua própria medida.</p></Reveal>
        <Reveal className="brand-values"><article><Heart size={26} aria-hidden="true" /><div><h3>Primeiro, sentir-se bem.</h3><p>Leveza e conforto para os seus momentos, no seu ritmo.</p></div></article><article><Sparkle size={26} aria-hidden="true" /><div><h3>Beleza de perto.</h3><p>Texturas, acabamentos e detalhes que merecem um segundo olhar.</p></div></article><article><Flower size={26} aria-hidden="true" /><div><h3>Do seu jeito.</h3><p>Delicada, intensa ou um pouco dos dois. Você escolhe.</p></div></article></Reveal>
      </section>
    </>
  )
}

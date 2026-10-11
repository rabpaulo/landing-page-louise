import { ArrowRight, MapPin } from '@phosphor-icons/react'
import { Reveal } from './Reveal'

export function BrandStory() {
  return (
    <section className="about-section section-container" id="sobre" aria-labelledby="about-title">
      <Reveal className="about-copy">
        <p className="eyebrow">SOBRE A MARÉ</p>
        <h2 id="about-title">Uma marca do litoral com atuação no atacado.</h2>
        <p>A Maré Íntima é uma marca fictícia criada para esta demonstração. Ela imagina uma operação com loja online, ateliê próprio e atendimento a quem compra moda íntima para revender, com linhas de conjuntos, bodys, croppeds, peças para dormir e sutiãs.</p>
        <a className="text-link" href="#colecao">Conhecer a vitrine <ArrowRight size={16} aria-hidden="true" /></a>
      </Reveal>
      <Reveal className="about-location">
        <div className="about-location-image"><img src="/images/lace-detail.webp" alt="Close editorial de renda vinho, cetim marfim e linha sobre uma superfície de areia." width="1400" height="933" loading="lazy" decoding="async" /></div>
        <p><MapPin size={18} aria-hidden="true" /><span>Ateliê Maré Íntima<br /><small>Rua das Marés, 120 · Endereço fictício</small></span></p>
        <small className="source-note">Marca, endereço e informações comerciais são fictícios e servem apenas para demonstração.</small>
      </Reveal>
    </section>
  )
}

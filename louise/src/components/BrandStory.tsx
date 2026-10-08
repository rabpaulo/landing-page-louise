import { ArrowUpRight, MapPin } from '@phosphor-icons/react'
import { Reveal } from './Reveal'

export function BrandStory() {
  return (
    <section className="about-section section-container" id="sobre" aria-labelledby="about-title">
      <Reveal className="about-copy">
        <p className="eyebrow">SOBRE A LOUISE</p>
        <h2 id="about-title">Uma marca de Fortaleza com atuação no atacado.</h2>
        <p>Além da loja online, a Louise mantém presença no Centro Fashion Fortaleza e atende quem compra moda íntima para revender. O catálogo público reúne linhas como conjuntos, bodys, croppeds, peças para dormir e sutiãs.</p>
        <a className="text-link" href="https://www.louiselingerie.com.br/" target="_blank" rel="noreferrer">Conhecer a Louise <ArrowUpRight size={16} aria-hidden="true" /></a>
      </Reveal>
      <Reveal className="about-location">
        <div className="about-location-image"><img src="/images/campaign.webp" alt="Detalhe de tecido e renda em tons de vinho, em uma composição editorial ilustrativa." width="1400" height="933" loading="lazy" decoding="async" /></div>
        <p><MapPin size={18} aria-hidden="true" /><span>Centro Fashion Fortaleza<br /><small>Setor Branco · corredor Monsenhor Tabosa · loja 2133</small></span></p>
        <small className="source-note">Referências consultadas no site e no catálogo públicos da marca. Endereço e informações comerciais podem mudar.</small>
      </Reveal>
    </section>
  )
}

import { ArrowUpRight, Check } from '@phosphor-icons/react'
import { Reveal } from './Reveal'

const wholesaleDetails = [
  'Canal de compra no atacado para revendedoras',
  'Envios informados para todo o Brasil',
  'Reposições frequentes no catálogo',
]

export function WholesaleSection() {
  return (
    <section className="wholesale-section" id="atacado" aria-labelledby="wholesale-title">
      <div className="wholesale-image"><img src="/images/campaign-720.webp" alt="Peças de lingerie em tons de vinho fotografadas sobre linho, em imagem ilustrativa." width="720" height="480" loading="lazy" decoding="async" /></div>
      <Reveal className="wholesale-copy">
        <p className="eyebrow">ATACADO LOUISE</p>
        <h2 id="wholesale-title">Moda íntima para o seu negócio.</h2>
        <p>Para comprar para revender, consulte o catálogo, as condições e a disponibilidade diretamente nos canais oficiais da Louise.</p>
        <ul>{wholesaleDetails.map(detail => <li key={detail}><Check size={17} aria-hidden="true" />{detail}</li>)}</ul>
        <a className="button button-light" href="https://www.louiselingerie.com.br/" target="_blank" rel="noreferrer">Ver catálogo oficial <ArrowUpRight size={17} aria-hidden="true" /></a>
        <small>As condições comerciais podem mudar. A compra acontece exclusivamente no site oficial.</small>
      </Reveal>
    </section>
  )
}

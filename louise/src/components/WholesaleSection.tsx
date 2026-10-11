import { ArrowRight, Check } from '@phosphor-icons/react'
import { Reveal } from './Reveal'

const wholesaleDetails = [
  'Canal de compra no atacado para revendedoras',
  'Envios para todo o Brasil',
  'Reposições frequentes no catálogo',
]

export function WholesaleSection() {
  return (
    <section className="wholesale-section" id="atacado" aria-labelledby="wholesale-title">
      <div className="wholesale-image"><img src="/images/wholesale-assortment.webp" alt="Seleção ilustrativa de body, camisola e conjuntos em renda e malha sobre linho claro." width="1400" height="933" loading="lazy" decoding="async" /></div>
      <Reveal className="wholesale-copy">
        <p className="eyebrow">ATACADO MARÉ</p>
        <h2 id="wholesale-title">Moda íntima para o seu negócio.</h2>
        <p>Uma seção pensada para quem compra para revender: catálogo, condições e reposições apresentados de forma clara.</p>
        <ul>{wholesaleDetails.map(detail => <li key={detail}><Check size={17} aria-hidden="true" />{detail}</li>)}</ul>
        <a className="button button-light" href="#colecao">Explorar a vitrine <ArrowRight size={17} aria-hidden="true" /></a>
        <small>Condições ilustrativas. Esta demonstração não realiza cadastros nem pedidos de atacado.</small>
      </Reveal>
    </section>
  )
}

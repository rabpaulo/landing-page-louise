import { m, useReducedMotion } from 'motion/react'
import { ArrowRight, Check } from '@phosphor-icons/react'
import { Reveal } from './Reveal'
import { ProgressiveImage } from './ProgressiveImage'

const wholesaleDetails = [
  'Canal de compra no atacado para revendedoras',
  'Envios para todo o Brasil',
  'Reposições frequentes no catálogo',
]

export function WholesaleSection() {
  const reduce = useReducedMotion()

  return (
    <section className="wholesale-section" id="atacado" aria-labelledby="wholesale-title">
      <div className="wholesale-image">
        <ProgressiveImage
          src="/images/wholesale-assortment.webp"
          alt="Seleção ilustrativa de body, camisola e conjuntos em renda e malha sobre linho claro."
          width={1400}
          height={933}
          wrapperClassName="wholesale-progressive-wrap"
        />
      </div>
      <Reveal className="wholesale-copy" direction="up">
        <p className="eyebrow">ATACADO MARÉ</p>
        <h2 id="wholesale-title">Moda íntima para o seu negócio.</h2>
        <p>Uma seção pensada para quem compra para revender: catálogo, condições e reposições apresentados de forma clara.</p>
        <ul>
          {wholesaleDetails.map((detail, index) => (
            <m.li
              key={detail}
              initial={reduce ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduce ? 0 : 0.5,
                delay: reduce ? 0 : 0.15 + index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Check size={17} aria-hidden="true" />
              {detail}
            </m.li>
          ))}
        </ul>
        <m.a
          className="button button-light"
          href="#colecao"
          whileHover={reduce ? undefined : { scale: 1.025 }}
          whileTap={reduce ? undefined : { scale: 0.98 }}
        >
          Explorar a vitrine <ArrowRight size={17} aria-hidden="true" />
        </m.a>
        <small>Condições ilustrativas. Esta demonstração não realiza cadastros nem pedidos de atacado.</small>
      </Reveal>
    </section>
  )
}

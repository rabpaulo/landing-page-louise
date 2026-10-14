import { m, useReducedMotion } from 'motion/react'
import { ProgressiveImage } from './ProgressiveImage'
import { Reveal } from './Reveal'
import type { CategoryFilter } from '../types'

const featured = [
  { label: 'Conjuntos', filter: 'Conjuntos' as const, image: '/images/conjunto-vinho-640.webp', alt: 'Conjunto de lingerie vinho com detalhes em renda.' },
  { label: 'Sutiãs & tops', filter: 'Sutiãs | Tops' as const, image: '/images/sutia-renda-640.webp', alt: 'Sutiã de renda em tom vinho.' },
  { label: 'Bodys', filter: 'Bodys' as const, image: '/images/body-renda-640.webp', alt: 'Body feminino escuro com recortes de renda.' },
  { label: 'Roupas de dormir', filter: 'Roupas de Dormir' as const, image: '/images/pijama-rosa-640.webp', alt: 'Conjunto leve de dormir em tom rosado.' },
]

export function CategoryShowcase({ onSelect }: { onSelect: (category: CategoryFilter) => void }) {
  const reduce = useReducedMotion()

  return (
    <section className="category-section section-container" id="categorias" aria-labelledby="categories-title">
      <Reveal className="section-heading" direction="up">
        <div>
          <p className="eyebrow">CATEGORIAS MARÉ</p>
          <h2 id="categories-title">Comece pelo que procura.</h2>
        </div>
        <p className="section-description">Uma amostra das linhas da Maré Íntima.</p>
      </Reveal>
      <div className="category-grid">
        {featured.map((item, index) => (
          <m.a
            className={'category-card category-card-' + (index + 1)}
            href="#colecao"
            key={item.label}
            onClick={() => onSelect(item.filter)}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: reduce ? 0 : 0.6,
              delay: reduce ? 0 : index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={reduce ? undefined : { y: -3 }}
          >
            <ProgressiveImage
              src={item.image}
              alt={item.alt}
              width={640}
              height={853}
              wrapperClassName="category-card-img-wrap"
            />
            <span className="category-card-shade" aria-hidden="true" />
            <span className="category-card-label">
              {item.label}
              <span className="category-arrow" aria-hidden="true">↗</span>
            </span>
          </m.a>
        ))}
      </div>
    </section>
  )
}

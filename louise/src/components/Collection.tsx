import { useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { Plus } from '@phosphor-icons/react'
import { products, formatPrice } from '../data/products'
import { categories } from '../types'
import type { CategoryFilter, Product } from '../types'
import { ProductDetails } from './ProductDetails'
import { ProgressiveImage } from './ProgressiveImage'
import { Reveal } from './Reveal'

export function Collection({ category, onCategoryChange, onAdded }: {
  category: CategoryFilter
  onCategoryChange: (category: CategoryFilter) => void
  onAdded: (name: string) => void
}) {
  const [selected, setSelected] = useState<Product | null>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()
  const shown = products.filter(product => category === 'Todos' || product.category === category)

  return (
    <section className="collection section-container" id="colecao" aria-labelledby="collection-title">
      <Reveal className="section-heading" direction="up">
        <div>
          <p className="eyebrow">VITRINE DEMONSTRATIVA</p>
          <h2 id="collection-title">Peças para explorar.</h2>
        </div>
        <p className="section-description">Fotos, variações e valores são demonstrativos.</p>
      </Reveal>

      <div className="filter-row">
        <div className="collection-filters" role="group" aria-label="Filtrar itens demonstrativos por categoria">
          {categories.map(option => (
            <button
              className={option === category ? 'filter active' : 'filter'}
              aria-pressed={option === category}
              onClick={() => onCategoryChange(option)}
              key={option}
            >
              <span>{option}</span>
              {option === category && !reduceMotion && (
                <m.span
                  className="filter-active-bar"
                  layoutId="activeFilterIndicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>
        <p className="product-count" aria-live="polite">
          {shown.length} {shown.length === 1 ? 'item' : 'itens'}
        </p>
      </div>

      {shown.length > 0 ? (
        <div className="product-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((product, index) => (
              <m.article
                className="product-card"
                data-testid="product-card"
                key={product.id}
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.35,
                  delay: reduceMotion ? 0 : Math.min(index * 0.03, 0.25),
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <button
                  className="product-image"
                  aria-label={'Ver exemplo de ' + product.name}
                  onClick={event => {
                    returnFocus.current = event.currentTarget
                    setSelected(product)
                  }}
                >
                  <ProgressiveImage
                    src={product.image}
                    srcSet={product.image.replace('.webp', '-360.webp') + ' 360w, ' + product.image.replace('.webp', '-640.webp') + ' 640w, ' + product.image + ' 960w'}
                    sizes="(max-width: 359px) calc(100vw - 48px), (max-width: 767px) calc((100vw - 62px) / 2), (max-width: 1400px) 23vw, 300px"
                    alt={product.alt}
                    width={960}
                    height={1280}
                    aspectRatio="3 / 4"
                    wrapperClassName="product-progressive-wrap"
                  />
                  <span className="quick-view" aria-hidden="true">
                    <Plus size={21} />
                    <span>Ver detalhes</span>
                  </span>
                </button>
                <div className="product-meta">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                  </div>
                  <p className="product-price">
                    {formatPrice(product.priceInCents)}
                    <small>*</small>
                  </p>
                </div>
                <span className="product-caption">Imagem e valor ilustrativos</span>
              </m.article>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <p className="empty-filter">Não há itens de demonstração nesta categoria.</p>
      )}

      <p className="catalog-footnote">
        <span>*</span> Valores ilustrativos de uma marca fictícia; não representam ofertas reais.
      </p>
      <ProductDetails
        key={selected?.id ?? 'closed'}
        product={selected}
        onClose={() => setSelected(null)}
        onAdded={onAdded}
        returnFocus={returnFocus}
      />
    </section>
  )
}

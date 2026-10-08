import { useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { Plus } from '@phosphor-icons/react'
import { products, formatPrice } from '../data/products'
import { categories } from '../types'
import type { CategoryFilter, Product } from '../types'
import { ProductDetails } from './ProductDetails'

export function Collection({ onAdded }: { onAdded: (name: string) => void }) {
  const [category, setCategory] = useState<CategoryFilter>('Todos')
  const [selected, setSelected] = useState<Product | null>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()
  const shown = products.filter(product => category === 'Todos' || product.category === category)
  return (
    <section className="collection section-container" id="colecao" aria-labelledby="collection-title">
      <h2 id="collection-title">Seu próximo favorito.</h2>
      <p className="section-description">Do primeiro toque ao último detalhe, escolha o que combina com você.</p>
      <div className="filter-row"><div className="collection-filters" role="group" aria-label="Filtrar por categoria">{categories.map(option => <button className={option === category ? 'filter active' : 'filter'} aria-pressed={option === category} onClick={() => setCategory(option)} key={option}>{option}</button>)}</div><p className="product-count" aria-live="polite">{shown.length} peças</p></div>
      <div className="product-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map(product => <m.article className="product-card" data-testid="product-card" key={product.id} layout={!reduceMotion} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .22 }}>
            <button className="product-image" aria-label={`Ver detalhes de ${product.name}`} onClick={event => { returnFocus.current = event.currentTarget; setSelected(product) }}>
              <img src={product.image} srcSet={`${product.image.replace('.webp', '-360.webp')} 360w, ${product.image.replace('.webp', '-640.webp')} 640w, ${product.image} 960w`} sizes="(max-width: 767px) calc((100vw - 62px) / 2), (max-width: 1400px) 30vw, 400px" alt={product.alt} width="960" height="1280" loading="lazy" decoding="async" />
              <span className="quick-view" aria-hidden="true"><Plus size={22} /><span>Ver detalhes</span></span>
            </button>
            <div className="product-meta"><div><h3>{product.name}</h3><p>{product.fabric}</p></div><p className="product-price">{formatPrice(product.priceInCents)}</p></div>
            <span className="color-detail"><span className={`color-swatch ${product.color === 'Vinho' ? 'wine' : product.color === 'Grafite' ? 'graphite' : 'rose'}`} aria-hidden="true" />{product.color}</span>
          </m.article>)}
        </AnimatePresence>
      </div>
      <ProductDetails key={selected?.id ?? 'closed'} product={selected} onClose={() => setSelected(null)} onAdded={onAdded} returnFocus={returnFocus} />
    </section>
  )
}

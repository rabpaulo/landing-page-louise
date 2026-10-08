import { useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Plus } from '@phosphor-icons/react'
import { products, formatPrice } from '../data/products'
import { categories } from '../types'
import type { CategoryFilter, Product } from '../types'
import { ProductDetails } from './ProductDetails'

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
      <div className="section-heading">
        <div><p className="eyebrow">VITRINE DEMONSTRATIVA</p><h2 id="collection-title">Peças para explorar.</h2></div>
        <p className="section-description">Fotos, variações e valores servem apenas para demonstrar a interface. Consulte o catálogo oficial para conferir os produtos disponíveis.</p>
      </div>
      <div className="filter-row">
        <div className="collection-filters" role="group" aria-label="Filtrar itens demonstrativos por categoria">
          {categories.map(option => <button className={option === category ? 'filter active' : 'filter'} aria-pressed={option === category} onClick={() => onCategoryChange(option)} key={option}>{option}</button>)}
        </div>
        <p className="product-count" aria-live="polite">{shown.length} {shown.length === 1 ? 'item' : 'itens'}</p>
      </div>
      {shown.length > 0 ? <div className="product-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map(product => <m.article className="product-card" data-testid="product-card" key={product.id} layout={!reduceMotion} initial={false} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .22 }}>
            <button className="product-image" aria-label={'Ver exemplo de ' + product.name} onClick={event => { returnFocus.current = event.currentTarget; setSelected(product) }}>
              <img src={product.image} srcSet={product.image.replace('.webp', '-360.webp') + ' 360w, ' + product.image.replace('.webp', '-640.webp') + ' 640w, ' + product.image + ' 960w'} sizes="(max-width: 359px) calc(100vw - 48px), (max-width: 767px) calc((100vw - 62px) / 2), (max-width: 1400px) 23vw, 300px" alt={product.alt} width="960" height="1280" loading="lazy" decoding="async" />
              <span className="quick-view" aria-hidden="true"><Plus size={21} /><span>Ver detalhes</span></span>
            </button>
            <div className="product-meta"><div><h3>{product.name}</h3><p>{product.category}</p></div><p className="product-price">{formatPrice(product.priceInCents)}<small>*</small></p></div>
            <span className="product-caption">Imagem e valor ilustrativos</span>
          </m.article>)}
        </AnimatePresence>
      </div> : <p className="empty-filter">Não há itens de demonstração nesta categoria.</p>}
      <p className="catalog-footnote"><span>*</span> Valores de exemplo, sem relação com preços ou condições comerciais vigentes. <a href="https://www.louiselingerie.com.br/produtos/" target="_blank" rel="noreferrer">Ver catálogo oficial <ArrowUpRight size={14} aria-hidden="true" /></a></p>
      <ProductDetails key={selected?.id ?? 'closed'} product={selected} onClose={() => setSelected(null)} onAdded={onAdded} returnFocus={returnFocus} />
    </section>
  )
}

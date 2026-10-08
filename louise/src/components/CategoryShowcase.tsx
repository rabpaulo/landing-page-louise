import type { CategoryFilter } from '../types'

const featured = [
  { label: 'Conjuntos', filter: 'Conjuntos' as const, image: '/images/conjunto-vinho-640.webp', alt: 'Conjunto de lingerie vinho com detalhes em renda.' },
  { label: 'Sutiãs & tops', filter: 'Sutiãs | Tops' as const, image: '/images/sutia-renda-640.webp', alt: 'Sutiã de renda em tom vinho.' },
  { label: 'Bodys', filter: 'Bodys' as const, image: '/images/body-renda-640.webp', alt: 'Body feminino escuro com recortes de renda.' },
  { label: 'Roupas de dormir', filter: 'Roupas de Dormir' as const, image: '/images/pijama-rosa-640.webp', alt: 'Conjunto leve de dormir em tom rosado.' },
]

export function CategoryShowcase({ onSelect }: { onSelect: (category: CategoryFilter) => void }) {
  return (
    <section className="category-section section-container" id="categorias" aria-labelledby="categories-title">
      <div className="section-heading">
        <div><p className="eyebrow">CATEGORIAS LOUISE</p><h2 id="categories-title">Comece pelo que procura.</h2></div>
        <p className="section-description">Uma amostra de algumas linhas disponíveis no catálogo da Louise.</p>
      </div>
      <div className="category-grid">
        {featured.map((item, index) => (
          <a className={'category-card category-card-' + (index + 1)} href="#colecao" key={item.label} onClick={() => onSelect(item.filter)}>
            <img src={item.image} alt={item.alt} width="640" height="853" loading="lazy" decoding="async" />
            <span className="category-card-shade" aria-hidden="true" />
            <span className="category-card-label">{item.label}<span aria-hidden="true">↗</span></span>
          </a>
        ))}
      </div>
    </section>
  )
}

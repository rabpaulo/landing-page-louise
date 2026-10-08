import type { Product } from '../types'

// Images, names and variants are demonstrative. Values reference comparable pieces
// in the public wholesale catalog; see docs/precificacao.md for sources and date.
export const products: readonly Product[] = [
  { id: 'hela', name: 'Conjunto Hela', category: 'Conjuntos', image: '/images/conjunto-vinho.webp', alt: 'Conjunto de lingerie vinho com renda floral sobre tecido claro.', priceInCents: 2990 },
  { id: 'afrodite', name: 'Conjunto Afrodite', category: 'Conjuntos', image: '/images/conjunto-rosa.webp', alt: 'Conjunto de lingerie rosa em tecido texturizado.', priceInCents: 2700 },
  { id: 'body-renda', name: 'Body rendado', category: 'Bodys', image: '/images/body-renda.webp', alt: 'Body escuro com detalhes de renda floral.', priceInCents: 3200 },
  { id: 'body-canelado', name: 'Body canelado', category: 'Bodys', image: '/images/body-canelado.webp', alt: 'Body claro sem mangas em tecido canelado.', priceInCents: 3000 },
  { id: 'nyx', name: 'Camisola Nyx', category: 'Roupas de Dormir', image: '/images/camisola-grafite.webp', alt: 'Camisola de cetim escuro com alças finas.', priceInCents: 3500 },
  { id: 'pijama-rosa', name: 'Pijama leve', category: 'Roupas de Dormir', image: '/images/pijama-rosa.webp', alt: 'Pijama leve rosado com blusa de alças e shorts.', priceInCents: 2400 },
  { id: 'sutia-renda', name: 'Sutiã rendado', category: 'Sutiãs | Tops', image: '/images/sutia-renda.webp', alt: 'Sutiã vinho de renda floral sobre tecido claro.', priceInCents: 2100 },
  { id: 'calcinha-rose', name: 'Calcinha de cintura alta', category: 'Calcinhas', image: '/images/calcinha-rose.webp', alt: 'Calcinha rosada de cintura alta com acabamento em renda.', priceInCents: 1100 },
  { id: 'lara', name: 'Cropped feminino Lara', category: 'Croppeds', image: '/images/cropped-offwhite.webp', alt: 'Cropped off-white em malha canelada.', priceInCents: 2600 },
  { id: 'modelador', name: 'Modelador de cintura alta', category: 'Modeladores', image: '/images/modelador-bege.webp', alt: 'Peça modeladora nude de cintura alta.', priceInCents: 3890 },
  { id: 'fitness', name: 'Conjunto fitness', category: 'Moda Fitness', image: '/images/conjunto-fitness.webp', alt: 'Top esportivo e legging ameixa em tecido flexível.', priceInCents: 6999 },
]

export const productById = new Map(products.map(product => [product.id, product]))
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
export const formatPrice = (cents: number) => currency.format(cents / 100)

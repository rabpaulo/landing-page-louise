import type { Product } from '../types'

export const products: readonly Product[] = [
  {
    id: 'aurora', name: 'Conjunto Aurora', category: 'Conjuntos',
    image: '/images/aurora.webp', alt: 'Sutiã e calcinha vinho com renda floral sobre fundo rosado.',
    priceInCents: 12990, color: 'Vinho', fabric: 'Renda floral com forro suave',
    description: 'Renda delicada, alças ajustáveis e um tom de vinho que faz dos pequenos momentos uma ocasião especial.',
  },
  {
    id: 'brisa', name: 'Conjunto Brisa', category: 'Conjuntos',
    image: '/images/brisa.webp', alt: 'Bralette e calcinha de cintura alta rosa com textura canelada.',
    priceInCents: 10990, color: 'Rosa suave', fabric: 'Malha canelada macia',
    description: 'Um abraço leve para a rotina. Bralette sem aro e cintura alta com textura canelada para acompanhar seus movimentos.',
  },
  {
    id: 'noite', name: 'Body Noite', category: 'Bodys',
    image: '/images/noite.webp', alt: 'Body grafite de renda floral com alças largas sobre fundo rosado.',
    priceInCents: 15990, color: 'Grafite', fabric: 'Renda floral com forro',
    description: 'Renda floral, alças largas e uma silhueta marcante. Uma peça para criar camadas e vestir do seu jeito.',
  },
  {
    id: 'alba', name: 'Body Alba', category: 'Bodys',
    image: '/images/alba.webp', alt: 'Body rosa claro sem mangas com textura canelada.',
    priceInCents: 13990, color: 'Rosa suave', fabric: 'Malha canelada flexível',
    description: 'Linhas simples e toque macio. O body canelado que combina com a sua rotina, por dentro e por fora.',
  },
  {
    id: 'serena', name: 'Pijama Serena', category: 'Linha dormir',
    image: '/images/serena.webp', alt: 'Pijama de cetim rosa com blusa de alças finas e shorts.',
    priceInCents: 14990, color: 'Rosa suave', fabric: 'Cetim de toque leve',
    description: 'Desacelere em um conjunto de cetim leve, com alças finas e shorts soltos. Um carinho no fim do dia.',
  },
  {
    id: 'calma', name: 'Camisola Calma', category: 'Linha dormir',
    image: '/images/calma.webp', alt: 'Camisola curta de cetim grafite com alças finas.',
    priceInCents: 11990, color: 'Grafite', fabric: 'Cetim com caimento fluido',
    description: 'Cetim fluido e delicadeza nos detalhes. A camisola que convida a encontrar tempo para você.',
  },
]

export const productById = new Map(products.map(product => [product.id, product]))
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
export const formatPrice = (cents: number) => currency.format(cents / 100)

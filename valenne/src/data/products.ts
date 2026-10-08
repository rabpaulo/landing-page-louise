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
    id: 'serena', name: 'Pijama Serena', category: 'Roupas de Dormir',
    image: '/images/serena.webp', alt: 'Pijama de cetim rosa com blusa de alças finas e shorts.',
    priceInCents: 14990, color: 'Rosa suave', fabric: 'Cetim de toque leve',
    description: 'Desacelere em um conjunto de cetim leve, com alças finas e shorts soltos. Um carinho no fim do dia.',
  },
  {
    id: 'calma', name: 'Camisola Calma', category: 'Roupas de Dormir',
    image: '/images/calma.webp', alt: 'Camisola curta de cetim grafite com alças finas.',
    priceInCents: 11990, color: 'Grafite', fabric: 'Cetim com caimento fluido',
    description: 'Cetim fluido e delicadeza nos detalhes. A camisola que convida a encontrar tempo para você.',
  },
  {
    id: 'sutia-dalia', name: 'Sutiã Dália', category: 'Sutiãs | Tops',
    image: '/images/sutia-dalia.webp', alt: 'Sutiã meia-taça vinho com renda floral e alças ajustáveis sobre linho rosado.',
    priceInCents: 7990, color: 'Vinho', fabric: 'Renda floral e microfibra',
    description: 'Meia-taça em renda floral, com alças ajustáveis e acabamento macio para o uso diário.',
  },
  {
    id: 'calcinha-tulipa', name: 'Calcinha Tulipa', category: 'Calcinhas',
    image: '/images/calcinha-tulipa.webp', alt: 'Calcinha rosa antigo de cintura alta em malha canelada com renda nas laterais.',
    priceInCents: 3990, color: 'Rosa antigo', fabric: 'Malha canelada com renda',
    description: 'Cintura alta, toque macio e recortes delicados de renda nas laterais.',
  },
  {
    id: 'cropped-mare', name: 'Cropped Maré', category: 'Croppeds',
    image: '/images/cropped-mare.webp', alt: 'Cropped off-white de malha canelada com mangas curtas e decote quadrado.',
    priceInCents: 8990, color: 'Off-white', fabric: 'Malha canelada',
    description: 'Malha canelada e decote quadrado em uma peça leve para usar com lingerie ou no dia a dia.',
  },
  {
    id: 'modelador-nuvem', name: 'Modelador Nuvem', category: 'Modeladores',
    image: '/images/modelador-nuvem.webp', alt: 'Calcinha modeladora nude de cintura alta em microfibra lisa.',
    priceInCents: 8990, color: 'Nude', fabric: 'Microfibra sem costura',
    description: 'Cintura alta e microfibra lisa para vestir sob diferentes peças com discrição.',
  },
  {
    id: 'conjunto-movimento', name: 'Conjunto Movimento', category: 'Moda Fitness',
    image: '/images/conjunto-movimento.webp', alt: 'Top esportivo e legging ameixa de cintura alta em malha esportiva.',
    priceInCents: 16990, color: 'Ameixa', fabric: 'Malha esportiva',
    description: 'Top esportivo e legging de cintura alta em malha flexível para acompanhar o movimento.',
  },
]

export const productById = new Map(products.map(product => [product.id, product]))
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
export const formatPrice = (cents: number) => currency.format(cents / 100)

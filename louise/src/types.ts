export const sizes = ['P', 'M', 'G', 'GG'] as const
export type Size = (typeof sizes)[number]

export const categories = [
  'Todos',
  'Conjuntos',
  'Bodys',
  'Croppeds',
  'Calcinhas',
  'Roupas de Dormir',
  'Modeladores',
  'Sutiãs | Tops',
  'Moda Fitness',
] as const

export type CategoryFilter = (typeof categories)[number]
export type Category = Exclude<CategoryFilter, 'Todos'>

export interface Product {
  id: string
  name: string
  category: Category
  image: string
  alt: string
  priceInCents: number
}

export interface CartItem {
  productId: string
  size: Size
  quantity: number
}

export function isSize(value: unknown): value is Size {
  return sizes.some(size => size === value)
}

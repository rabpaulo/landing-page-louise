import { useEffect } from 'react'
import { flushSync } from 'react-dom'
import { products, productById } from '../data/products'
import { useCart } from '../cart/CartProvider'
import { isSize } from '../types'

type Tool = {
  name: string
  title: string
  description: string
  inputSchema: object
  annotations: { readOnlyHint: boolean; untrustedContentHint: boolean }
  execute: (input: unknown) => unknown
}
type ModelContext = { registerTool: (tool: Tool, options: { signal: AbortSignal }) => void | Promise<void> }

// Optional progressive enhancement: unsupported browsers keep the same UI.
export function WebMCP() {
  const { addItem } = useCart()
  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContext }).modelContext
    if (!context?.registerTool) return
    const lifecycle = new AbortController()
    const tools: Tool[] = [
      {
        name: 'list_louise_concept_products', title: 'Consultar a vitrine demonstrativa',
        description: 'Lista itens e valores ilustrativos deste projeto conceitual. Não representa o catálogo oficial nem realiza compras.',
        inputSchema: { type: 'object', properties: {}, additionalProperties: false },
        annotations: { readOnlyHint: true, untrustedContentHint: false },
        execute: () => ({ demo: true, official: false, products: products.map(({ id, name, category, priceInCents }) => ({ id, name, category, priceInCents, sizes: ['P', 'M', 'G', 'GG'] })) }),
      },
      {
        name: 'add_to_louise_demo_bag', title: 'Adicionar à sacola demonstrativa',
        description: 'Adiciona uma unidade de um produto e tamanho à sacola local e atualiza o contador visível. Apenas simulação; não cria pedidos nem pagamentos.',
        inputSchema: { type: 'object', properties: { productId: { type: 'string' }, size: { type: 'string', enum: ['P', 'M', 'G', 'GG'] } }, required: ['productId', 'size'], additionalProperties: false },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute: input => {
          if (typeof input !== 'object' || input === null || !('productId' in input) || !('size' in input) || typeof input.productId !== 'string' || !productById.has(input.productId) || !isSize(input.size)) throw new Error('Produto ou tamanho inválido.')
          const { productId, size } = input
          flushSync(() => addItem(productId, size))
          return { demo: true, staged: true, productId, size }
        },
      },
    ]
    for (const tool of tools) {
      try { void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {}) }
      catch { /* Registry failures never block the storefront. */ }
    }
    return () => lifecycle.abort()
  }, [addItem])
  return null
}

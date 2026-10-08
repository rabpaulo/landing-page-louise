import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import { productById } from '../data/products'
import { isSize } from '../types'
import type { CartItem, Size } from '../types'

const STORAGE_KEY = 'valenne.cart.v1'
export const MAX_QUANTITY = 99
type Action =
  | { type: 'add'; productId: string; size: Size }
  | { type: 'quantity'; productId: string; size: Size; quantity: number }
  | { type: 'remove'; productId: string; size: Size }

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false
  if (!('productId' in value && 'size' in value && 'quantity' in value)) return false
  return typeof value.productId === 'string' && productById.has(value.productId)
    && isSize(value.size) && typeof value.quantity === 'number'
    && Number.isInteger(value.quantity) && value.quantity > 0 && value.quantity <= MAX_QUANTITY
}

function restoreCart(): CartItem[] {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(stored) || stored.length > productById.size * 4 || !stored.every(isCartItem)) return []
    const merged: CartItem[] = []
    for (const item of stored) {
      const existing = merged.find(other => other.productId === item.productId && other.size === item.size)
      if (existing) existing.quantity = Math.min(MAX_QUANTITY, existing.quantity + item.quantity)
      else merged.push({ productId: item.productId, size: item.size, quantity: item.quantity })
    }
    return merged
  } catch { return [] }
}

function reducer(items: CartItem[], action: Action): CartItem[] {
  if (!productById.has(action.productId) || !isSize(action.size)) return items
  const matches = (item: CartItem) => item.productId === action.productId && item.size === action.size
  if (action.type === 'remove') return items.filter(item => !matches(item))
  if (action.type === 'quantity') {
    if (!Number.isInteger(action.quantity) || action.quantity < 1 || action.quantity > MAX_QUANTITY) return items
    return items.map(item => matches(item) ? { ...item, quantity: action.quantity } : item)
  }
  if (!items.some(matches)) return [...items, { productId: action.productId, size: action.size, quantity: 1 }]
  return items.map(item => matches(item) ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + 1) } : item)
}

interface CartContextValue {
  items: CartItem[]
  count: number
  subtotal: number
  addItem: (productId: string, size: Size) => void
  setQuantity: (item: CartItem, quantity: number) => void
  removeItem: (item: CartItem) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, undefined, restoreCart)
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch { /* Local state remains usable without storage. */ }
  }, [items])
  const addItem = useCallback((productId: string, size: Size) => dispatch({ type: 'add', productId, size }), [])
  const setQuantity = useCallback((item: CartItem, quantity: number) => dispatch({ type: 'quantity', ...item, quantity }), [])
  const removeItem = useCallback((item: CartItem) => dispatch({ type: 'remove', ...item }), [])
  const value = useMemo(() => ({
    items, addItem, setQuantity, removeItem,
    count: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + (productById.get(item.productId)?.priceInCents ?? 0) * item.quantity, 0),
  }), [items, addItem, setQuantity, removeItem])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const cart = useContext(CartContext)
  if (!cart) throw new Error('useCart must be used inside CartProvider')
  return cart
}

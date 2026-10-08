import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Bag, CheckCircle, Minus, Plus, Trash, X } from '@phosphor-icons/react'
import { MAX_QUANTITY, useCart } from '../cart/CartProvider'
import { formatPrice, productById } from '../data/products'

export function CartDrawer() {
  const [open, setOpen] = useState(false)
  const [finished, setFinished] = useState(false)
  const { items, count, subtotal, setQuantity, removeItem } = useCart()
  return (
    <Dialog.Root open={open} onOpenChange={value => { setOpen(value); setFinished(false) }}>
      <Dialog.Trigger asChild>
        <button className="icon-button bag-trigger" aria-label={`Abrir sacola, ${count} ${count === 1 ? 'item' : 'itens'}`}>
          <Bag size={24} aria-hidden="true" />
          {count > 0 && <span className="bag-count" aria-hidden="true">{count}</span>}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="cart-sheet">
          <div className="sheet-heading">
            <div><Dialog.Title>Sua sacola</Dialog.Title><Dialog.Description>{count} {count === 1 ? 'peça escolhida' : 'peças escolhidas'} por você</Dialog.Description></div>
            <Dialog.Close asChild><button className="icon-button" aria-label="Fechar sacola"><X aria-hidden="true" /></button></Dialog.Close>
          </div>
          {items.length === 0 ? (
            <div className="bag-empty">
              <Bag size={55} aria-hidden="true" />
              <h3>Sua sacola está esperando por você.</h3>
              <p>Escolha um item na vitrine para testar esta etapa da experiência.</p>
              <Dialog.Close asChild><a className="button button-primary" href="#colecao">Conhecer as peças</a></Dialog.Close>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map(item => {
                  const product = productById.get(item.productId)!
                  const label = `${product.name}, ${item.size}`
                  return (
                    <article className="cart-item" key={`${item.productId}-${item.size}`} data-testid="cart-item">
                      <img src={product.image.replace('.webp', '-360.webp')} alt={product.alt} width="90" height="120" />
                      <div className="cart-item-info">
                        <h3>{product.name}</h3><p>Tamanho {item.size} · opção demonstrativa</p>
                        <strong>{formatPrice(product.priceInCents * item.quantity)}</strong>
                        <div className="cart-item-actions">
                          <div className="quantity-control">
                            <button aria-label={`Diminuir quantidade de ${label}`} onClick={() => { setQuantity(item, item.quantity - 1); setFinished(false) }} disabled={item.quantity === 1}><Minus size={14} aria-hidden="true" /></button>
                            <span aria-label={`Quantidade de ${label}`}>{item.quantity}</span>
                            <button aria-label={`Aumentar quantidade de ${label}`} onClick={() => { setQuantity(item, item.quantity + 1); setFinished(false) }} disabled={item.quantity >= MAX_QUANTITY}><Plus size={14} aria-hidden="true" /></button>
                          </div>
                          <button className="remove-button" aria-label={`Remover ${label}`} onClick={() => { removeItem(item); setFinished(false) }}><Trash size={19} aria-hidden="true" /></button>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
              <div className="cart-summary">
                <div className="subtotal"><span>Subtotal</span><strong data-testid="cart-subtotal" aria-live="polite">{formatPrice(subtotal)}</strong></div>
                <p>Valores ilustrativos. Esta sacola faz parte de uma demonstração.</p>
                {finished ? <div className="demo-confirmation" role="status"><CheckCircle size={24} aria-hidden="true" /><div><strong>Você explorou a sacola demonstrativa.</strong><p>Nenhum pedido foi enviado e nenhum pagamento foi realizado. Os itens continuam na sacola.</p></div></div> : <button className="button button-primary w-full" onClick={() => setFinished(true)}>Testar finalização</button>}
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

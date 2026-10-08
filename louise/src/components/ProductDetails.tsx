import { useState } from 'react'
import type { RefObject } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Bag, X } from '@phosphor-icons/react'
import { useCart } from '../cart/CartProvider'
import { formatPrice } from '../data/products'
import { sizes } from '../types'
import type { Product, Size } from '../types'

export function ProductDetails({ product, onClose, onAdded, returnFocus }: {
  product: Product | null
  onClose: () => void
  onAdded: (name: string) => void
  returnFocus: RefObject<HTMLElement | null>
}) {
  const [size, setSize] = useState<Size | null>(null)
  const { addItem } = useCart()
  return (
    <Dialog.Root open={product !== null} onOpenChange={open => { if (!open) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="product-dialog" onCloseAutoFocus={event => { event.preventDefault(); returnFocus.current?.focus() }}>
          {product && <>
            <Dialog.Close asChild><button className="icon-button product-close" aria-label="Fechar detalhes"><X aria-hidden="true" /></button></Dialog.Close>
            <img className="product-dialog-photo" src={product.image} alt={product.alt} width="960" height="1280" />
            <div className="product-dialog-info">
              <p className="product-category">{product.category}</p>
              <Dialog.Title>{product.name}</Dialog.Title>
              <p className="detail-price">{formatPrice(product.priceInCents)}</p>
              <Dialog.Description>Esta peça aparece como referência para demonstrar a vitrine. Foto, preço e variações não são uma oferta de venda.</Dialog.Description>
              <dl className="product-spec"><div><dt>Linha</dt><dd>{product.category}</dd></div><div><dt>Dados</dt><dd>Ilustrativos</dd></div></dl>
              <fieldset className="size-selector"><legend>Escolha seu tamanho</legend><div className="size-options">{sizes.map(option => <label className="size-option" key={option}><input type="radio" name="size" value={option} checked={size === option} onChange={() => setSize(option)} /><span>{option}</span></label>)}</div></fieldset>
              <p className="size-hint">{size ? `Tamanho ${size} selecionado.` : 'Selecione um tamanho para adicionar.'}</p>
              <button className="button button-primary add-button" disabled={!size} onClick={() => { if (!size) return; addItem(product.id, size); onAdded(product.name); onClose() }}><Bag size={19} aria-hidden="true" />Adicionar à sacola</button>
              <p className="detail-demo">Tamanhos e valor ilustrativos. Esta interação não envia um pedido.</p>
            </div>
          </>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

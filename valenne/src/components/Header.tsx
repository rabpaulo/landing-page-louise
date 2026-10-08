import * as Dialog from '@radix-ui/react-dialog'
import { List, X } from '@phosphor-icons/react'
import { CartDrawer } from './CartDrawer'

const links = [{ href: '#colecao', label: 'A coleção' }, { href: '#essencia', label: 'Nossa essência' }, { href: '#duvidas', label: 'Dúvidas' }]

export function Wordmark() {
  return <a className="wordmark" href="#inicio" aria-label="Valenne Lingerie, início">valenne<span>LINGERIE</span></a>
}

export function Header() {
  return (
    <>
      <div className="announcement">Um pouco de leveza. Muito de você.</div>
      <header className="site-header">
        <Dialog.Root>
          <Dialog.Trigger asChild><button className="icon-button mobile-menu-trigger" aria-label="Abrir menu"><List size={25} aria-hidden="true" /></button></Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="dialog-overlay" />
            <Dialog.Content className="menu-sheet">
              <div className="sheet-heading"><div><Dialog.Title>Menu Valenne</Dialog.Title><Dialog.Description>Encontre seu momento.</Dialog.Description></div><Dialog.Close asChild><button className="icon-button" aria-label="Fechar menu"><X aria-hidden="true" /></button></Dialog.Close></div>
              <nav aria-label="Navegação no celular">{links.map(link => <Dialog.Close asChild key={link.href}><a href={link.href}>{link.label}</a></Dialog.Close>)}</nav>
              <p className="menu-signature">Para sentir. Para ser você.</p>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <Wordmark />
        <nav className="desktop-nav" aria-label="Navegação principal">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
        <CartDrawer />
      </header>
    </>
  )
}

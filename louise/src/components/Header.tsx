import * as Dialog from '@radix-ui/react-dialog'
import { List, X } from '@phosphor-icons/react'
import { CartDrawer } from './CartDrawer'

const links = [
  { href: '#categorias', label: 'Categorias' },
  { href: '#colecao', label: 'Vitrine' },
  { href: '#atacado', label: 'Atacado' },
  { href: '#sobre', label: 'Sobre a Maré' },
]

export function Wordmark() {
  return <a className="wordmark" href="#inicio" aria-label="Maré Íntima, início"><span>MARÉ</span><small>ÍNTIMA</small></a>
}

export function Header() {
  return (
    <>
      <div className="announcement"><span>CONCEITO INDEPENDENTE</span><span aria-hidden="true">·</span><span>MARCA FICTÍCIA PARA DEMONSTRAÇÃO TÉCNICA</span></div>
      <header className="site-header">
        <Dialog.Root>
          <Dialog.Trigger asChild><button className="icon-button mobile-menu-trigger" aria-label="Abrir menu"><List size={24} aria-hidden="true" /></button></Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="dialog-overlay" />
            <Dialog.Content className="menu-sheet">
              <div className="sheet-heading"><div><Dialog.Title>Maré Íntima</Dialog.Title><Dialog.Description>Navegação do conceito</Dialog.Description></div><Dialog.Close asChild><button className="icon-button" aria-label="Fechar menu"><X aria-hidden="true" /></button></Dialog.Close></div>
              <nav aria-label="Navegação no celular">{links.map(link => <Dialog.Close asChild key={link.href}><a href={link.href}>{link.label}</a></Dialog.Close>)}</nav>
              <Dialog.Close asChild><a className="menu-official" href="#duvidas">Sobre este projeto <span aria-hidden="true">→</span></a></Dialog.Close>
              <p className="menu-signature">Projeto conceitual independente</p>
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

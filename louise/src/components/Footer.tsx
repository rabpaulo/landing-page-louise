import { ArrowUpRight } from '@phosphor-icons/react'
import { Wordmark } from './Header'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand"><Wordmark /><p>Moda íntima, varejo e atacado em Fortaleza.</p></div>
        <nav className="footer-nav" aria-label="Navegação no rodapé">
          <a href="#categorias">Categorias</a>
          <a href="#colecao">Vitrine demonstrativa</a>
          <a href="#atacado">Atacado</a>
          <a href="#sobre">Sobre a Louise</a>
          <a href="#duvidas">Dúvidas</a>
        </nav>
        <a className="footer-official" href="https://www.louiselingerie.com.br/" target="_blank" rel="noreferrer">Ver site oficial <ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
      <div className="project-note">
        <p>Projeto conceitual independente desenvolvido para fins de demonstração técnica. Não é um site oficial da Louise Lingerie.</p>
        <small>Conceito de experiência digital desenvolvido por Paulo Rabelo.</small>
      </div>
      <div className="footer-bottom"><span>© 2026 · Louise Lingerie — conceito independente</span><a href="https://www.louiselingerie.com.br/" target="_blank" rel="noreferrer">Louiselingerie.com.br <ArrowUpRight size={13} aria-hidden="true" /></a></div>
    </footer>
  )
}

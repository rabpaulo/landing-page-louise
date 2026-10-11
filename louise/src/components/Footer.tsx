import { ArrowUp } from '@phosphor-icons/react'
import { Wordmark } from './Header'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand"><Wordmark /><p>Moda íntima, varejo e atacado. Uma marca fictícia.</p></div>
        <nav className="footer-nav" aria-label="Navegação no rodapé">
          <a href="#categorias">Categorias</a>
          <a href="#colecao">Vitrine demonstrativa</a>
          <a href="#atacado">Atacado</a>
          <a href="#sobre">Sobre a Maré</a>
          <a href="#duvidas">Dúvidas</a>
        </nav>
        <a className="footer-official" href="#inicio">Voltar ao início <ArrowUp size={17} aria-hidden="true" /></a>
      </div>
      <div className="project-note">
        <p>Projeto conceitual independente. Maré Íntima é uma marca fictícia, sem relação com empresas reais.</p>
        <small>Desenvolvido por Paulo Rabelo como demonstração técnica independente de desenvolvimento web.</small>
      </div>
      <div className="footer-bottom"><span>© 2026 · Maré Íntima — marca fictícia</span><span>Demonstração técnica</span></div>
    </footer>
  )
}

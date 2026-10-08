import { Wordmark } from './Header'

export function Footer() {
  return <footer className="footer"><div className="footer-top"><div><Wordmark /><p>Um pouco de leveza. Muito de você.</p></div><nav aria-label="Navegação no rodapé"><a href="#colecao">A coleção</a><a href="#essencia">Nossa essência</a><a href="#duvidas">Dúvidas</a></nav><p className="footer-note">Feita para sentir.<br />Pensada para ser sua.</p></div><div className="footer-bottom"><span>© 2026 Valenne Lingerie</span><span>Projeto demonstrativo · Marca e produtos fictícios</span></div></footer>
}

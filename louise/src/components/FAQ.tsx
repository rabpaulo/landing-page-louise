import { ArrowRight, Plus } from '@phosphor-icons/react'

const questions = [
  { question: 'Como funciona o atacado?', answer: 'Nesta demonstração, a seção de atacado mostra como uma marca poderia apresentar seu canal para revendedoras. Pedido mínimo, preços e descontos não são definidos, pois a marca é fictícia.' },
  { question: 'Posso fazer um pedido?', answer: 'Não. A sacola funciona apenas no seu navegador e a finalização é simulada: nenhum pedido, pagamento ou envio é realizado.' },
  { question: 'As peças e os preços desta vitrine são reais?', answer: 'Não. Fotos, nomes, combinações e valores são ilustrativos e foram criados para compor a demonstração.' },
  { question: 'A Maré Íntima existe?', answer: 'Não. Maré Íntima é uma marca fictícia. Esta página é um projeto conceitual desenvolvido por Paulo Rabelo como demonstração técnica independente de desenvolvimento web.' },
]

export function FAQ() {
  return (
    <section className="faq section-container" id="duvidas" aria-labelledby="faq-title">
      <div className="faq-heading"><p className="eyebrow">PERGUNTAS FREQUENTES</p><h2 id="faq-title">Antes de continuar.</h2><p className="section-description">O que você precisa saber sobre esta demonstração.</p><a className="faq-official-link" href="#colecao">Voltar à vitrine <ArrowRight size={15} aria-hidden="true" /></a></div>
      <div className="faq-list">{questions.map(item => <details key={item.question}><summary>{item.question}<Plus size={19} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
    </section>
  )
}

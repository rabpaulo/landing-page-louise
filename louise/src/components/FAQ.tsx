import { ArrowUpRight, Plus } from '@phosphor-icons/react'

const questions = [
  { question: 'Como funciona o atacado?', answer: 'A Louise mantém um canal de vendas no atacado. Pedido mínimo, preços, descontos e demais condições devem ser confirmados no catálogo oficial, pois podem mudar.' },
  { question: 'A Louise envia para outras cidades?', answer: 'O site oficial informa envios para todo o Brasil. Consulte as opções, prazos e valores atualizados durante a compra no site da marca.' },
  { question: 'As peças e os preços desta vitrine são oficiais?', answer: 'As fotos e combinações são demonstrativas. Os valores são referências por categoria pesquisadas no catálogo público em 8 de outubro de 2026; podem não corresponder ao modelo exibido nem ao preço atual. Confirme preço e disponibilidade no site oficial.' },
  { question: 'Este é o site oficial da Louise Lingerie?', answer: 'Não. Esta página é um projeto conceitual independente desenvolvido por Paulo Rabelo como demonstração técnica para uma candidatura à vaga de Desenvolvedor de Sistema Júnior.' },
]

export function FAQ() {
  return (
    <section className="faq section-container" id="duvidas" aria-labelledby="faq-title">
      <div className="faq-heading"><p className="eyebrow">PERGUNTAS FREQUENTES</p><h2 id="faq-title">Antes de continuar.</h2><p className="section-description">O que é demonstração e o que você encontra nos canais da Louise.</p><a className="faq-official-link" href="https://www.louiselingerie.com.br/" target="_blank" rel="noreferrer">Ir ao site oficial <ArrowUpRight size={15} aria-hidden="true" /></a></div>
      <div className="faq-list">{questions.map(item => <details key={item.question}><summary>{item.question}<Plus size={19} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
    </section>
  )
}

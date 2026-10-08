import { Plus } from '@phosphor-icons/react'

const questions = [
  { question: 'Como escolher meu tamanho?', answer: 'Compare suas medidas com o caimento de uma peça que você já usa. Nesta coleção demonstrativa, os tamanhos P, M, G e GG servem para explorar a seleção e a sacola.' },
  { question: 'Como cuidar das peças?', answer: 'Lave peças delicadas à mão, com sabão neutro e água fria. Seque à sombra e evite torcer a renda. Em peças reais, siga sempre as instruções da etiqueta.' },
  { question: 'Como funciona a sacola?', answer: 'Escolha uma peça, selecione seu tamanho e adicione à sacola. Você pode mudar a quantidade ou remover itens. Sua seleção fica salva apenas neste navegador.' },
  { question: 'Posso fazer uma compra de verdade?', answer: 'Este é um projeto demonstrativo de front-end. A Valenne, os produtos e os preços são fictícios. A finalização é simulada, sem pagamento ou envio de pedidos.' },
]

export function FAQ() {
  return <section className="faq section-container" id="duvidas" aria-labelledby="faq-title"><div className="faq-heading"><h2 id="faq-title">Antes de escolher.</h2><p className="section-description">Algumas respostas para você<br className="desktop-break" /> se sentir à vontade.</p></div><div className="faq-list">{questions.map(item => <details key={item.question}><summary>{item.question}<Plus size={20} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></section>
}

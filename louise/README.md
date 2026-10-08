# Louise Lingerie — conceito de experiência digital

Projeto conceitual independente desenvolvido por Paulo Rabelo como demonstração técnica para a vaga de Desenvolvedor de Sistema Júnior. Não é um site oficial nem possui vínculo com a Louise Lingerie.

## Referência de negócio

O site público da Louise apresenta operação de atacado, envio para todo o Brasil e categorias como conjuntos, sutiãs e tops, bodys, croppeds e roupas de dormir. A marca também informa presença no Centro Fashion Fortaleza. Valores mínimos, descontos, estoque e prazos podem variar; consulte sempre o site oficial: https://www.louiselingerie.com.br/.

A vitrine local é ilustrativa. Fotos, combinações, tamanhos e preços não são ofertas nem dados oficiais do catálogo.

## Executar

Requisitos: Node.js 22.13 ou mais recente e npm.

1. Rode npm ci.
2. Opcional: copie .env.example para .env.local e informe GEMINI_API_KEY para habilitar as respostas do assistente.
3. Rode npm run dev.

Sem GEMINI_API_KEY, as interações de navegação, filtro e sacola continuam disponíveis; o assistente informa que está temporariamente indisponível.

## Interações

- Cartões de categoria selecionam a categoria correspondente na vitrine.
- Filtros acessíveis refinam a seleção e anunciam a quantidade de itens.
- Detalhes do item permitem escolher um tamanho demonstrativo e adicionar à sacola.
- A sacola local agrupa tamanhos, altera quantidades, remove itens, calcula valores de exemplo e persiste no navegador.
- O menu mobile, FAQ e assistente têm estados de abertura, fechamento e foco.
- Links comerciais levam ao site oficial da Louise.
- A sacola e a ferramenta WebMCP não criam pedidos ou pagamentos.

## Organização

- app: layout, metadata social e rota da página.
- src/components: header, categorias, vitrine, atacado, informação institucional, FAQ, sacola e assistente.
- src/data/products.ts: catálogo demonstrativo tipado.
- src/cart: estado da sacola, validação e persistência local.
- src/server/gemini-chat.ts: endpoint seguro do assistente, com limite de mensagens e sem alegações em nome da Louise.
- tests: testes de interação, responsividade e acessibilidade.
- public/images: fotografias editoriais conceituais em WebP; não são imagens do catálogo oficial.

## Verificações

Rode npm run lint, npm run typecheck, npm run build e npm test.

## Publicar na Vercel

O diretório de aplicação mudou para louise. No projeto Vercel landing-page-louise, ajuste Root Directory para louise antes de um novo deploy. GEMINI_API_KEY é opcional e deve permanecer como variável de servidor, sem prefixo NEXT_PUBLIC_.

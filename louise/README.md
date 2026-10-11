# Maré Íntima — conceito de experiência digital

Projeto conceitual desenvolvido por Paulo Rabelo como demonstração técnica independente de desenvolvimento web. Maré Íntima é uma marca fictícia, criada para esta demonstração e sem vínculo com empresas reais.

## Marca fictícia

A Maré Íntima imagina uma marca de moda íntima com loja online, ateliê próprio e canal de atacado para revendedoras, com categorias como conjuntos, sutiãs e tops, bodys, croppeds e roupas de dormir. Nome, endereço, produtos, fotos, tamanhos e valores são ilustrativos.

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
- A sacola local agrupa tamanhos, altera quantidades, remove itens, calcula subtotais com valores ilustrativos e persiste no navegador.
- O menu mobile, FAQ e assistente têm estados de abertura, fechamento e foco.
- Não há links para sites de marcas reais; os chamados levam a seções da própria página.
- A sacola e a ferramenta WebMCP não criam pedidos ou pagamentos.

## Organização

- app: layout, metadata social e rota da página.
- src/components: header, categorias, vitrine, atacado, informação institucional, FAQ, sacola e assistente.
- src/data/products.ts: catálogo demonstrativo tipado.
- src/cart: estado da sacola, validação e persistência local.
- src/server/gemini-chat.ts: endpoint seguro do assistente, com limite de mensagens e restrito a informações da demonstração.
- tests: testes de interação, responsividade e acessibilidade.
- public/images: fotografias editoriais conceituais em WebP; não são imagens de produtos reais.

## Verificações

Rode npm run lint, npm run typecheck, npm run build e npm test.

## Publicar na Vercel

O diretório de aplicação é `louise`, configurado como Root Directory no projeto Vercel `landing-page-louise`. Pushes para `main` iniciam o deploy de produção. `GEMINI_API_KEY` é opcional e deve permanecer como variável de servidor, sem prefixo `NEXT_PUBLIC_`.

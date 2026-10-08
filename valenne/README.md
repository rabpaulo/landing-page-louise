# Valenne Lingerie

Estudo autoral de uma landing page de moda íntima com vitrine interativa e assistente Gemini, criado para apresentação em uma candidatura de front-end.

A referência de segmento e navegação é [Louise Lingerie](https://www.louiselingerie.com.br/). Marca, textos, layout, produtos e imagens da Valenne são próprios deste estudo. Valenne é fictícia; preços e sacola são demonstrativos. Não há pagamentos, cadastro ou pedidos reais. As perguntas enviadas ao assistente são processadas pela API Gemini.

## Executar

Requisitos: Node.js 22.13+ e npm. As versões estão fixadas em `package-lock.json`.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Preencha `GEMINI_API_KEY` em `.env.local` para ativar o chat local. Esse arquivo é ignorado pelo Git; a chave é lida somente pela rota de servidor e nunca vai para o bundle do navegador.

Abra a URL exibida pelo Vite. Para conferir a versão de produção:

```bash
npm run build
npm start
```

## O que demonstrar na entrevista

- React e TypeScript: componentes por responsabilidade, catálogo tipado e estado compartilhado.
- Vitrine: categorias, detalhes do produto e seleção obrigatória de tamanho.
- Sacola: variantes agrupadas por produto e tamanho, quantidades, remoção e subtotal em centavos.
- Persistência local: recuperação após recarregar, validação dos dados e uso com armazenamento indisponível.
- Acessibilidade: HTML semântico, foco visível, diálogos com foco contido, Escape e retorno do foco.
- Assistente: perguntas sobre o conteúdo do site respondidas pelo Gemini por um endpoint do Worker.
- Design: responsividade, fotos originais, movimento reduzido e temas conforme o sistema.
- Qualidade: testes no navegador, verificação de TypeScript e build de produção.

## Decisões visuais

Campanha de moda com Manrope, fotografia em destaque e composição assimétrica. Rosa suave, grafite e vinho conectam a narrativa à vitrine. Geometria reta, espaço entre elementos e transições discretas mantêm o foco nas peças. Os temas usam tokens semânticos e seguem a preferência do sistema.

Direção: `DESIGN_VARIANCE: 7`, `MOTION_INTENSITY: 4`, `VISUAL_DENSITY: 3`. Camadas CSS: cabeçalho 20, fundo de diálogos 40, conteúdo de diálogos 50 e link de salto 60.

Fotos geradas com a ferramenta integrada de geração de imagens. São representações conceituais; características e valores do catálogo não são ofertas reais. Prompts e otimização ficam em `docs/imagens.md`.

## Tecnologias e organização

Next.js, React, TypeScript, Tailwind CSS, Motion, Phosphor Icons, Radix Dialog e Manrope hospedada no próprio build. A rota de servidor do chat valida as mensagens e aplica limites antes de chamar a API Gemini. Playwright e axe-core verificam as jornadas e acessibilidade; Lighthouse analisa produção. Sharp prepara WebP e não é usado no site em tempo de execução.

- `src/data`: catálogo e conteúdo.
- `src/types.ts`: contratos compartilhados.
- `src/cart`: estado, persistência e operações.
- `src/components`: navegação, vitrine, detalhes e sacola.
- `src/server/gemini-chat.ts`: lógica server-side do proxy do chat.
- `app/api/chat/route.ts`: endpoint `/api/chat`; lê `GEMINI_API_KEY` do ambiente do servidor.
- `tests`: testes de ponta a ponta.
- `public/images`: imagens WebP locais.

A sacola usa apenas `localStorage`. Dados inválidos são descartados e os preços sempre vêm do catálogo. Não há banco de dados, autenticação ou checkout externo. O chat envia apenas as mensagens recentes ao Gemini e não grava o histórico no servidor.

## Verificações

```bash
npx playwright install chromium
npm test
npm run typecheck
```

Os 16 testes cobrem filtros, tamanhos, variantes, subtotal, persistência, dados inválidos, armazenamento bloqueado, menu no celular, retorno de foco e layouts de 375, 768 e 1440 pixels nos temas claro e escuro. Axe-core verifica a página e o diálogo de produto. As capturas e relatórios locais ficam em `reports/` e `playwright-report/`, ignorados pelo Git.

Resultados e escopo das verificações estão em [docs/validacao.md](./docs/validacao.md). As métricas Lighthouse registradas ali são da versão estática anterior à integração do chat.

## Publicação na Vercel

O projeto usa Next.js e pode ser implantado na Vercel com o diretório `valenne` como raiz. Configure `GEMINI_API_KEY` nas variáveis de ambiente do projeto para Production, Preview e Development. Mantenha o segredo como variável sensível e use o mesmo nome, sem o prefixo `NEXT_PUBLIC_`, para que ele permaneça no servidor.

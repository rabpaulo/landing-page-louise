# Validação da entrega

Verificação executada em 8 de outubro de 2026 na versão conceitual Louise Lingerie.

## Verificações

- `npm run lint`: aprovado.
- `npm run typecheck`: aprovado.
- `npm test`: 30 testes aprovados em Chromium.
- `npm run build`: aprovado com Next.js 16.3.4; a página inicial é pré-renderizada e `/api/chat` é dinâmica.
- Testes responsivos em 320, 375, 390, 430, 768, 1024, 1280, 1440 e 1920 px, nos temas claro e escuro, com movimento reduzido.
- Axe-core sem violações na página e na janela de detalhes do produto, nos dois temas.
- Fluxos cobertos: filtros e categorias; seleção obrigatória de tamanho; variantes e quantidades na sacola; subtotal, remoção e persistência; dados inválidos e armazenamento indisponível; menu móvel e retorno de foco; hidratação de sacola salva; identificação explícita da demonstração no checkout.

## Limites da demonstração

O catálogo, preços e imagens são ilustrativos. A sacola funciona no navegador, mas o checkout não envia pedidos nem pagamentos. O assistente é uma demonstração e não representa o atendimento oficial da marca. Não foram executados testes de pedido, pagamento, estoque, autenticação, chave Gemini nem serviços de produção.

Não foi feita uma nova medição Lighthouse nesta versão. Os relatórios antigos foram descartados porque mediam uma versão anterior e não descrevem este redesign.

## Publicação

Esta verificação é local; não houve publicação nem validação do endereço público. O código agora está em `louise/`. Antes de uma próxima publicação, ajuste o **Root Directory** do projeto na Vercel para `louise` e então publique e confira o domínio.

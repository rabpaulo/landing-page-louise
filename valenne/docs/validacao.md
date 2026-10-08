# Validação da entrega

Os resultados de navegador e Lighthouse abaixo são da versão estática verificada em 7 de outubro de 2026, antes da migração do site para Worker para incluir o chat.

## Worker e assistente Gemini

- `npm run build`: aprovado após a migração para Vinext e Worker.
- `npm run typecheck`: aprovado.
- Testes de navegador e chamada real à API Gemini não foram executados nesta atualização.
- A chave local fica em `.dev.vars`, ignorado pelo Git. A chave de produção ainda não foi configurada: `get_site` retornou `NOT_FOUND` para o ID de Site preservado no manifesto.

## Código e jornadas

- `npm run build`: aprovado, incluindo TypeScript.
- `npm test`: 16 testes aprovados com Chromium.
- Filtros, tamanho obrigatório, agrupamento de variantes, quantidades, remoção, subtotal e recuperação após recarregar.
- Rejeição de dados inválidos e funcionamento com armazenamento indisponível.
- Menu no celular, fechamento por Escape e retorno de foco dos diálogos.
- Larguras de 375, 768 e 1440 pixels, nos temas claro e escuro, com movimento reduzido.
- Axe-core sem violações nas verificações da página e do diálogo de produto nos dois temas.
- Revisão visual da campanha e confirmação do carregamento das oito imagens da página.
- Ferramentas WebMCP verificadas pela prévia: consulta do catálogo, adição válida e rejeição de produto desconhecido.

## Lighthouse

Lighthouse 13.5.0, Chromium, servido por Vite Preview em `127.0.0.1:4173`. O perfil móvel usa a configuração padrão de simulação; o desktop usa 1440 × 900 e fator de CPU 1.

| Medida | Celular | Desktop |
| --- | ---: | ---: |
| Desempenho | 91 | 100 |
| Acessibilidade | 100 | 100 |
| Boas práticas | 100 | 100 |
| SEO | 100 | 100 |
| LCP | 3,3 s | 0,8 s |
| CLS | 0,001 | 0,001 |
| TBT | 30 ms | 0 ms |

Os números são medições de laboratório local e variam conforme CPU, rede e hospedagem. O LCP móvel de 3,3 s permanece uma oportunidade de melhoria. As imagens têm WebP responsivo; a principal recebe preload e prioridade alta. As funcionalidades de animação e layout do Motion carregam em um módulo separado para reduzir o JavaScript inicial.

Relatórios HTML e JSON e capturas ficam em `reports/`, ignorado pelo Git. As evidências do Playwright ficam em `playwright-report/`.

## Publicação

A identidade original foi preservada em `.openai/hosting.json`. A publicação não foi concluída: o Sites retorna `NOT_FOUND` para o projeto registrado. É necessário recuperar o acesso ao mesmo projeto para configurar a variável de runtime `GEMINI_API_KEY`, sincronizar o código, publicar e verificar o endereço público. Nenhum endereço público foi validado.

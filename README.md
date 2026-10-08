# Louise Lingerie — experiência digital conceitual

Projeto independente de landing page desenvolvido por Paulo Rabelo como demonstração técnica. **Não é um site oficial e não possui vínculo com a Louise Lingerie.**

O código da aplicação fica em [`louise/`](./louise/). O catálogo, os preços e as imagens são ilustrativos; a sacola funciona apenas no navegador e não envia pedidos nem pagamentos.

## Conteúdo

- [Começar](#começar)
- [Configuração do assistente](#configuração-do-assistente)
- [Comandos disponíveis](#comandos-disponíveis)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Publicação](#publicação)
- [Documentação](#documentação)

## Começar

**Requisitos:** Node.js 22.13 ou mais recente e npm.

```bash
cd louise
npm ci
npm run dev
```

Abra o endereço local exibido no terminal para ver a aplicação.

## Configuração do assistente

A chave Gemini é opcional. Sem ela, a navegação, os filtros e a sacola continuam disponíveis, e o assistente informa que está temporariamente indisponível.

Para habilitá-lo, dentro de `louise/`, copie o arquivo de exemplo e preencha a chave:

```bash
cp .env.example .env.local
```

```dotenv
GEMINI_API_KEY=sua-chave
```

A chave é usada no servidor e não deve receber o prefixo `NEXT_PUBLIC_`.

## Comandos disponíveis

Execute-os dentro de `louise/`:

| Comando | Ação |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run lint` | Analisa o código com ESLint. |
| `npm run typecheck` | Verifica os tipos TypeScript. |
| `npm test` | Executa os testes Playwright. |
| `npm run build` | Gera a versão de produção. |
| `npm start` | Inicia a versão de produção já compilada. |

## Estrutura do projeto

```text
louise/
├── app/              # Layout, página e rota da API do assistente
├── src/
│   ├── cart/          # Estado e persistência local da sacola
│   ├── components/    # Seções e componentes da interface
│   ├── data/          # Catálogo demonstrativo
│   └── server/        # Integração do assistente no servidor
├── public/            # Imagens, fontes e outros arquivos estáticos
├── tests/             # Testes de interação e acessibilidade
└── docs/              # Referências e validação da entrega
```

## Publicação

Para publicar na Vercel, configure **Root Directory** como `louise`. Se o assistente estiver habilitado, cadastre `GEMINI_API_KEY` como variável de ambiente do servidor.

## Documentação

- [Guia detalhado da aplicação](./louise/README.md)
- [Validação da entrega](./louise/docs/validacao.md)
- [Referências e prompts de imagens](./louise/docs/imagens.md)
- [Site oficial da Louise Lingerie](https://www.louiselingerie.com.br/)

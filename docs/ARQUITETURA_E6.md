# Arquitetura técnica — CONQUEST Full Stack

## Panorama

```text
[GitHub / VS Code / Issues / Figma]
              |
       push / pull request
              |
      [GitHub Actions: CI]
       |                |
  [Vitest/node:test] [Selenium + Chrome]
       |                |
        \              /
             Vite build
                 |
        [GitHub Pages - HTTPS]
          /                \
 /Entregavel6-Ambientes/   /Entregavel6-Ambientes/ambientes/
 [Portal CONQUEST 3D]      [Mostra seis ambientes + botão GET API]
 [React conta/Ranking]
          |
          | HTTPS / WSS
          v
       [Nhost sa-east-1]
   [Nhost Auth + JWT] [Functions /v1/duel (Node.js)]
           \              /
            [Hasura GraphQL]
                    |
              [PostgreSQL]
  auth.users / conquest_scores / conquest_duels / view leaderboard
```

## Responsabilidades e fronteiras

| Componente | O que faz | O que não faz |
|---|---|---|
| GitHub Pages | Entrega HTML, CSS, JS e assets WebGL | Não executa Express nem Node.js de API |
| Babylon.js | Renderização 3D, WebGL, cenário e controle | Não persiste senhas ou banco relacional |
| React | Estado de formulário, modal e dados de conta | Não deve acessar admin secret |
| Nhost Auth | Login, cadastro, sessão e token JWT | Não é a IDE nem o provedor de frontend estático |
| Functions | Recebe REST, valida token, ordem dos duelos e respostas | Não contém interface HTML principal |
| Hasura / PostgreSQL | Consultas e gravação persistentes por permissões | Não roda no GitHub Pages |
| Selenium | Teste ponta a ponta num navegador real | Não substitui teste manual com dois jogadores |

## Fontes de código

- `src/game/scene.js`: mundo 3D do Babylon.js.
- `src/game/logic.js`: operações e evolução da partida.
- `src/ui/account-panel.js`: painel React.
- `src/services/nhost.js`: autenticação, sessões, GraphQL e Function REST.
- `functions/duel.js`: endpoint de ações de duelo, validação das respostas.
- `nhost/migrations/*.sql`: estrutura SQL que configura as tabelas e a classificação.
- `public/ambientes/index.html`: portal explicativo + leitura pública em tempo real da Function.
- `.github/workflows/selenium.yml`: E2E.
- `.github/workflows/pages.yml`: CI/CD de deploy.

## Banco: dados e privilégios

`conquest_scores`: ID UUID, `user_id`, pontos, respostas corretas, total, conclusão e timestamp. Hasura deve aplicar filtro `user_id = X-Hasura-User-Id` ao papel de usuário. Não autorizar leitura pública dos scores particulares.

`conquest_duels`: código, anfitrião, convidado, rodada, resultados e estados `waiting`, `active`, `finished`, `cancelled`. O backend é responsável pelas mutações; clientes não devem atualizar arbitrariamente pontuação.

`conquest_duel_leaderboard`: view de resultados de duelos concluídos, fornecendo apelido e pontuações públicas, sem e-mail.

**Atenção:** o código SQL versionado é a definição desejada, não uma captura direta do estado atual do banco. Confirme tabelas, colunas e permissões no Nhost Dashboard.

## Fluxo do teste Selenium

O workflow instala Node.js 22, Python 3.12, Chrome e chromedriver; executa `npm ci` e o build; inicia Vite em `localhost:5173`; roda Python Selenium; grava capturas de tela; anexa screenshots aos artefatos Actions.

O GitHub Pages do novo repositório publica a aplicação E6 com caminho `/Entregavel6-Ambientes/` e a página `/ambientes/`; o E5 permanece em endereço próprio. A verificação da Function Nhost consulta o ranking público sem segredo.

# Roteiro oral — CONQUEST Entregável 6 Full Stack

**Tempo aproximado: 6–8 minutos.** Sequência sugerida, sem prints estáticos obrigatórios.

| Tempo | Demonstração | O que explicar |
|---|---|---|
| 0:00–0:50 | [Portal E6](https://ruan-levi.github.io/Entregavel6-Ambientes/ambientes/) | “Reaproveitamos o CONQUEST da Entregável 5 para estudar os seis ambientes da disciplina.” |
| 0:50–1:40 | [GitHub Issues](https://github.com/Ruan-levi/Entregavel6-Ambientes/issues) | Gestão de tarefas por assunto, responsáveis e acompanhamento. Mostrar as Issues #1–#6 do repositório E6. |
| 1:40–2:25 | [Figma](https://www.figma.com/design/Gir9pqcDf92GYOmacmwmfO) | Protótipo com telas editáveis, proposta visual, interface de conta e desenho da arquitetura. |
| 2:25–3:20 | VS Code e `.vscode/tasks.json` | IDE de desenvolvimento. Mostrar arquivos `src/`, `functions/`, `nhost/` e tarefas `npm test` e `npm run build`. |
| 3:20–4:20 | [Nhost Dashboard](https://app.nhost.io/) | Auth, PostgreSQL/Hasura, tabela de pontuação, tabela de duelos e view do ranking; não mostrar dados privados. |
| 4:20–5:25 | [GitHub Actions](https://github.com/Ruan-levi/Entregavel6-Ambientes/actions) | Selenium automatiza navegador, testes unitários e capturas de tela. Abrir a execução recente e verificar seu resultado real. |
| 5:25–6:15 | [Jogo completo](https://ruan-levi.github.io/Entregavel6-Ambientes/) | Jogar: cenário 3D Babylon.js, perguntas de conjuntos, controles e painel React de contas. |
| 6:15–7:10 | [Demonstração de API REST](https://ruan-levi.github.io/Entregavel6-Ambientes/ambientes/) | Clicar em “Consultar API agora”. Explicar GET na Function e resposta JSON em ranking público. |
| 7:10–8:00 | [Repositório](https://github.com/Ruan-levi/Entregavel6-Ambientes) | Concluir: frontend no Pages, backend Auth/REST e banco PostgreSQL no Nhost; GitHub Actions publica e testa. |

## Falas de referência — linguagem simples

**Abertura:** “O CONQUEST é um jogo educativo em 3D que ensina Teoria dos Conjuntos. Nesta sexta entrega, nós utilizamos esse mesmo jogo para aprender como ferramentas diferentes trabalham juntas no desenvolvimento.”

**Frontend:** “O navegador mostra a interface HTML e CSS, o Babylon.js cria o mundo 3D, e o React organiza as telas de conta, histórico e ranking.”

**Backend:** “Quando precisamos de autenticação ou dados que não podem ficar só no navegador, utilizamos o Nhost. A Function em JavaScript recebe as solicitações REST, verifica o jogador e conversa com o PostgreSQL.”

**Gestão e design:** “Para organizar as tarefas, criamos issues reais no GitHub. Para projetar a interface, construímos protótipos editáveis no Figma.”

**IDE e testes:** “As tarefas de desenvolvimento podem ser executadas pelo VS Code. O Selenium abre um navegador Chrome automaticamente, testa os fluxos e gera evidências no GitHub Actions.”

**Hospedagem:** “O GitHub Pages publica a parte visível, enquanto o Nhost executa o backend e mantém o banco. São serviços diferentes trabalhando na mesma aplicação.”

## Arquivos para abrir ao vivo, em ordem

1. `index.html` e `src/main.js` — jogo original e controles.
2. `src/game/scene.js` — Babylon.js, câmera e renderização.
3. `src/ui/account-panel.js` — React, hooks e formulário.
4. `src/services/nhost.js` — cliente de autenticação, consultas e sessões.
5. `functions/duel.js` — API REST e validação de partidas.
6. `nhost/migrations/001_conquest_scores.sql` e `002_conquest_duels.sql` — SQL/PostgreSQL.
7. `e2e/tests/test_browser.py` — automação Selenium.
8. `.github/workflows/pages.yml` e `selenium.yml` — CI/CD e publicação.
9. `public/ambientes/index.html` — página que reúne os seis ambientes.

## Cuidados na apresentação

- Se a consulta à API falhar ao vivo, mostre os logs reais no GitHub Actions e investigue a conexão. Não invente resposta.
- A demonstração visual do Nhost exige entrar na conta com permissão.
- Use contas e dados fictícios, sem exibir senhas, tokens ou admin secret.
- Não atribua autoria de código produzido por outra equipe; explique a reutilização da Entregável 5.
- Evite afirmar que o GitHub Pages executa Node.js: ele publica apenas o frontend estático.

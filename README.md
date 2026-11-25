# CONQUEST — Entregável 6 | Aplicação Full Stack

**Disciplina: Ambientes de Desenvolvimento de Software · UNIFOR**

A Entregável 6 é um **projeto independente**, desenvolvido a partir da aplicação CONQUEST da Entregável 5. Reutilizamos o jogo educativo 3D para apresentar e testar seis ambientes reais de desenvolvimento. Este repositório possui **código, documentação, testes, Issues, workflow e GitHub Pages próprios**.

**[🎮 Jogar CONQUEST E6](https://ruan-levi.github.io/Entregavel6-Ambientes/)** · **[🧭 Visitar os seis ambientes](https://ruan-levi.github.io/Entregavel6-Ambientes/ambientes/)** · [Testes e publicação](https://github.com/Ruan-levi/Entregavel6-Ambientes/actions) · [Tarefas da equipe](https://github.com/Ruan-levi/Entregavel6-Ambientes/issues) · [Protótipo Figma](https://www.figma.com/design/Gir9pqcDf92GYOmacmwmfO)

> Os links do GitHub Pages passam a funcionar quando o pipeline de publicação estiver concluído. Se uma página retornar 404, confira [Settings → Pages](https://github.com/Ruan-levi/Entregavel6-Ambientes/settings/pages), selecione **GitHub Actions** e verifique o [workflow](https://github.com/Ruan-levi/Entregavel6-Ambientes/actions).

## O que foi desenvolvido?

O CONQUEST é um jogo 3D educativo sobre **Teoria dos Conjuntos**, com missões, cristais, guardiões, perguntas matemáticas, cadastro/login, histórico de pontuações, ranking e duelos online. A sexta entrega utiliza essa aplicação como base e adiciona um portal para demonstrar os seis ambientes da disciplina, um quadro de gestão, um protótipo Figma, configuração do VS Code e testes Selenium.

A estrutura é **full stack**:

| Camada | Tecnologia | Função |
|---|---|---|
| Frontend | HTML5, CSS3, JavaScript e React | Telas, formulários e interface |
| Mundo 3D | Babylon.js e WebGL | Renderização, câmera, missões e combate |
| Build | Node.js, npm e Vite | Desenvolvimento e compilação |
| Backend | Nhost Auth e Functions JavaScript/Node.js | Login, sessões, validação de duelos e REST |
| Persistência | PostgreSQL com Hasura/GraphQL | Partidas, histórico e ranking |
| Hospedagem | GitHub Pages e Nhost | Frontend estático e serviços de backend |
| Qualidade | Vitest, `node:test`, Selenium WebDriver e Chrome | Testes de lógica, API e navegador |
| Automação | GitHub Actions | CI/CD, publicação e evidências |

**O GitHub Pages não executa Node.js no servidor.** Ele publica os arquivos estáticos do Vite. A API REST e o PostgreSQL funcionam na infraestrutura do **Nhost**.

## Os seis ambientes demonstrados

| Nº | Categoria exigida | Ferramenta utilizada | Evidência |
|---:|---|---|---|
| 1 | Gestão de tarefas | GitHub Issues | [Issue #1](https://github.com/Ruan-levi/Entregavel6-Ambientes/issues/1) e [quadro de gestão](docs/GESTAO_E6.md) |
| 2 | UI/UX design | Figma | [Protótipo editável](https://www.figma.com/design/Gir9pqcDf92GYOmacmwmfO) |
| 3 | Ambiente de desenvolvimento | Visual Studio Code | [Configurações e tarefas](.vscode/) |
| 4 | Gestão de banco de dados | Nhost Dashboard, Hasura e PostgreSQL | [Migrações SQL](nhost/migrations/) |
| 5 | Ambiente de testes | Selenium, Chrome, Vitest e Node.js | [Testes E2E](e2e/tests/) e [GitHub Actions](.github/workflows/selenium.yml) |
| 6 | Execução e servidores web | GitHub Pages e Nhost Functions | [Workflow Pages](.github/workflows/pages.yml) |

## Organização do repositório

```text
Entregavel6-Ambientes/
├── README.md
├── index.html                     # Entrada do jogo
├── src/
│   ├── main.js                    # Lógica do jogo e eventos
│   ├── style.css                  # Aparência, HUD e responsividade
│   ├── game/                      # Babylon.js, missões, questões e interação
│   ├── ui/
│   │   ├── account-panel.js       # Painel React / Nhost
│   │   ├── account-panel.css
│   │   └── duel.js                # Interface de duelo
│   └── services/nhost.js          # Auth, GraphQL, Storage e REST
├── public/ambientes/index.html    # Portal dos seis ambientes E6
├── functions/duel.js              # Código-fonte da API REST de duelo
├── nhost/migrations/              # PostgreSQL / Hasura
├── tests/                         # Testes unitários e de backend
├── e2e/
│   ├── tests/test_browser.py      # Selenium + Chrome
│   ├── requirements.txt
│   └── README.md
├── .vscode/                       # Editor, extensões e tarefas
├── .github/workflows/
│   ├── pages.yml                  # Build + Pages + Nhost
│   └── selenium.yml               # E2E e screenshots
├── scripts/                       # Checagens de build, cloud e Pages
├── docs/                          # Requisitos, arquitetura e roteiro
├── vite.config.js                 # Base /Entregavel6-Ambientes/
└── package.json
```

## Como executar localmente

Requer **Node.js 22.12+**, npm, Python 3 e Google Chrome para o teste de navegador.

```bash
git clone https://github.com/Ruan-levi/Entregavel6-Ambientes.git
cd Entregavel6-Ambientes
npm ci
cp .env.example .env
npm test
npm run dev
```

No Windows PowerShell, substitua `cp` por `Copy-Item .env.example .env`.

- Jogo: **http://localhost:5173/**
- Seis ambientes: **http://localhost:5173/ambientes/index.html**

Testes Selenium (com o servidor Vite executando):

```bash
python -m pip install -r e2e/requirements.txt
python -m unittest discover -s e2e/tests -p "test_*.py" -v
```

## Integração Nhost compartilhada

Esta aplicação utiliza **o mesmo projeto Nhost que o CONQUEST Nuvem e a Entregável 5**, preservando as contas e os dados. Configuração **pública** do cliente:

- `VITE_NHOST_SUBDOMAIN=xbnokoslfakjqteiyvbu`
- `VITE_NHOST_REGION=sa-east-1`

O GitHub Actions pode usar as variáveis de repositório `NHOST_SUBDOMAIN` e `NHOST_REGION`. **Nunca inserir `NHOST_ADMIN_SECRET` nem tokens privados em `VITE_*`, no frontend ou no Git.**

O código de `functions/duel.js` é mantido nesta entrega para estudo, mas ter dois repositórios consumindo o Nhost **não significa que a Function seja implantada automaticamente pelos dois repositórios**. A implantação dessa Function deve ser confirmada no projeto conectado ao painel Nhost. Consulte [configuração Nhost](docs/NHOST.md) e [duelos online](docs/NHOST_DUELOS.md).

## Histórico e separação entre entregas

- **[Entregável 5](https://github.com/Ruan-levi/Entregavel5-Ambientes)**: jogo original da quinta etapa, com [GitHub Pages independente](https://ruan-levi.github.io/Entregavel5-Ambientes/).
- **[CONQUEST Nuvem](https://github.com/Ruan-levi/Conquest-nuvem)**: projeto original do jogo, preservado.
- **Entregável 6 (este repositório)**: cópia reaproveitada, com identidade, frontend, código, testes e documentação próprios, sem alterar os anteriores.

## Documentos para apresentação

- [Atividade e matriz dos seis ambientes](docs/ENTREGAVEL6.md)
- [Roteiro de apresentação (6–8 minutos)](docs/ROTEIRO_APRESENTACAO_E6.md)
- [Arquitetura full stack](docs/ARQUITETURA_E6.md)
- [Plano de testes e evidências](docs/PLANO_TESTES_E6.md)
- [Gestão das tarefas e responsáveis](docs/GESTAO_E6.md)
- [Figma e decisões UI/UX](docs/DESIGN_E6.md)

Os testes automatizados comprovam **somente os casos executados**. Cadastro com confirmação de e-mail, permissões reais do painel privado e duelo completo com duas contas devem ser demonstrados manualmente quando necessário.

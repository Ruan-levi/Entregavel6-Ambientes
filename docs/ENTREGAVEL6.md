# Entregável 6 — CONQUEST Full Stack e seis ambientes

**Disciplina:** Ambientes de Desenvolvimento de Software — UNIFOR  
**Aplicação:** CONQUEST, jogo 3D educativo de Teoria dos Conjuntos  
**Repositório da sexta entrega:** https://github.com/Ruan-levi/Entregavel6-Ambientes  
**Jogo E6:** https://ruan-levi.github.io/Entregavel6-Ambientes/  
**Portal de demonstração:** https://ruan-levi.github.io/Entregavel6-Ambientes/ambientes/  
**Base reaproveitada:** https://github.com/Ruan-levi/Entregavel5-Ambientes

## 1. Objetivo da atividade

A proposta da Entregável 6 é explorar o maior número possível de **ambientes de desenvolvimento de software**, passando por: gestão de tarefas, criação de interfaces, programação em uma IDE, banco de dados, testes e execução/servidores. A equipe escolheu **seis ambientes** e documentou seu papel dentro de uma aplicação full stack real.

A sexta entrega é um **repositório independente**. Ela utiliza uma cópia funcional do jogo da quinta etapa e adiciona documentação, protótipo UI/UX, tarefas organizadas, testes Selenium e um portal próprio. O código da Entregável 5 e o do CONQUEST Nuvem original não foram substituídos.

## 2. Arquitetura full stack

```text
Usuário → navegador (GitHub Pages)
              ├─ HTML/CSS e React: formulários, conta, ranking
              ├─ JavaScript/Babylon.js: cenário 3D e interações
              └─ HTTPS/WebSocket
                      |
                      v
                Nhost (sa-east-1)
               ├─ Auth: login, cadastro e JWT
               ├─ Functions Node.js: REST para duelos
               ├─ Hasura: consultas GraphQL
               └─ PostgreSQL: partidas, pontuações e ranking
```

**Responsabilidades:** Vite gera frontend estático publicado no Pages. O backend roda no Nhost; não há um servidor Express instalado no Pages. Os serviços de autenticação e dados são compartilhados com o projeto original por decisão arquitetural.

## 3. Matriz dos seis ambientes

| Nº | Categoria | Ferramenta | Evidência real |
|---:|---|---|---|
| 1 | Gestão da equipe | **GitHub Issues** | [Issues #1–#6](https://github.com/Ruan-levi/Entregavel6-Ambientes/issues) e [plano de gestão](GESTAO_E6.md) |
| 2 | Design de interfaces | **Figma** | [Telas editáveis](https://www.figma.com/design/Gir9pqcDf92GYOmacmwmfO) e [análise UX](DESIGN_E6.md) |
| 3 | Desenvolvimento / IDE | **Visual Studio Code** | [Workspace](../.vscode/), `package.json`, `src/`, `functions/` |
| 4 | Banco de dados | **Nhost/Hasura/PostgreSQL** | [SQL](../nhost/migrations/), [serviço Nhost](../src/services/nhost.js) |
| 5 | Testes | **Selenium WebDriver + Chrome** | [4 testes E2E](../e2e/tests/test_browser.py), [pipeline](../.github/workflows/selenium.yml), Vitest/`node:test` |
| 6 | Servidores web | **GitHub Pages + Nhost Functions** | [CI/CD](../.github/workflows/pages.yml), [portal E6](https://ruan-levi.github.io/Entregavel6-Ambientes/ambientes/) |

### 1. Gestão — GitHub Issues

O GitHub Issues organiza as seis frentes de trabalho, com descrições, critérios de aceite e checklists. O quadro foi criado no **repositório E6**, e não na quinta entrega. Os integrantes devem atribuir seus próprios responsáveis e marcar itens concluídos após verificação. [Planejamento](GESTAO_E6.md).

### 2. Design — Figma

O arquivo editável contém três quadros: portal, login React e arquitetura full stack. Permite comparar o protótipo com a interface implementada e discutir clareza de navegação, legibilidade, feedback e consistência visual. [Acessar Figma](https://www.figma.com/design/Gir9pqcDf92GYOmacmwmfO).

### 3. Desenvolvimento — Visual Studio Code

As configurações compartilhadas da pasta `.vscode/` incluem extensões, editor e tarefas para instalar dependências, iniciar o Vite, rodar testes e compilar. O projeto utiliza JavaScript, React, Babylon.js e Node.js. A IDE real aberta no computador deve ser demonstrada pela equipe; versionar o workspace não substitui essa demonstração.

### 4. Banco — Nhost e PostgreSQL

O Nhost gerencia autenticação e PostgreSQL. As migrações em `nhost/migrations/` definem pontuações da campanha, duelos e a view pública de ranking. O cliente em `src/services/nhost.js` consulta o backend com GraphQL, e a Function `functions/duel.js` oferece operações REST. A equipe deve mostrar a estrutura e permissões no Dashboard privado, **sem exibir senhas, admin secret ou usuários reais**. Não reexecute migrações já aplicadas.

### 5. Testes — Selenium

`e2e/tests/test_browser.py` realiza quatro testes de navegador: (a) existência dos seis ambientes, (b) página do jogo 3D, (c) digitação no painel React sem captura de WASD pelo jogo, (d) consulta pública real à Function REST. O workflow `.github/workflows/selenium.yml` usa Chrome headless e publica screenshots, complementando os testes Vitest e Node.js. [Plano completo](PLANO_TESTES_E6.md).

### 6. Execução — GitHub Pages e Nhost

O workflow `.github/workflows/pages.yml` executa os testes, compila o Vite com a base `/Entregavel6-Ambientes/`, publica `dist/` e verifica o jogo e a página `/ambientes/`. O Nhost mantém a autenticação, os endpoints JavaScript e os dados persistentes. O portal permite clicar em **Consultar API agora** para demonstrar uma resposta JSON pública do backend.

## 4. Arquivos usados na apresentação

- `index.html` e `src/main.js` — portal, lógica e eventos.
- `src/game/scene.js`, `src/game/logic.js` — cenário e regras 3D.
- `src/ui/account-panel.js` — React, `useState`, `useEffect` e formulário.
- `src/services/nhost.js` — login, sessão, GraphQL, Storage e chamada à Function.
- `functions/duel.js` — REST com `GET` de ranking e `POST` de operações de duelo.
- `nhost/migrations/` — scripts de estrutura e view PostgreSQL.
- `e2e/tests/test_browser.py` — quatro cenários de Selenium.
- `public/ambientes/index.html` — página que reúne os seis ambientes.

## 5. Como testar e executar

```bash
npm ci
npm test
cp .env.example .env
npm run dev
```

Jogo em `http://localhost:5173/`; portal em `http://localhost:5173/ambientes/index.html`. Testes:

```bash
python -m pip install -r e2e/requirements.txt
python -m unittest discover -s e2e/tests -p 'test_*.py' -v
```

O site público deve ser verificado após cada publicação em [GitHub Actions](https://github.com/Ruan-levi/Entregavel6-Ambientes/actions). Se o Pages ainda não estiver ativo, configure [Settings → Pages](https://github.com/Ruan-levi/Entregavel6-Ambientes/settings/pages) para usar **GitHub Actions**.

### Ativação inicial do GitHub Pages

O GitHub Pages precisa ser ativado uma vez por um administrador em [Settings → Pages](https://github.com/Ruan-levi/Entregavel6-Ambientes/settings/pages) usando **Source: GitHub Actions**. A publicação não pode ser considerada concluída apenas porque o código foi integrado à `main`; confirme os jobs de deploy e verificação. Após a configuração, reexecute o workflow de publicação em GitHub Actions.

## 6. Limites importantes

- A Function de duelo dispõe de `GET` para ranking e `POST` para ações distintas. Isso **não equivale automaticamente a CRUD REST com quatro rotas**.
- Compartilhar o mesmo projeto Nhost não cria dois vínculos de deployment automáticos das Functions. O repositório que publica a Function é administrado separadamente no Nhost.
- Uma execução verde do Selenium não prova cadastro real com e-mail confirmado, acesso administrativo ao banco ou duelo completo com duas pessoas.
- Toda conta usada em demonstração deve ser fictícia.

**Documentação adicional:** [arquitetura](ARQUITETURA_E6.md), [roteiro oral](ROTEIRO_APRESENTACAO_E6.md), [plano de testes](PLANO_TESTES_E6.md), [gestão](GESTAO_E6.md) e [Figma](DESIGN_E6.md).

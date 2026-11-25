# Plano de testes e evidências — Entregável 6

## Testes implementados

| ID | Ferramenta | Procedimento | Resultado esperado |
|---|---|---|---|
| CT-01 | Selenium/Chrome | Abrir `/ambientes/`, verificar título, seis cartões e links | Página carrega e apresenta as seis categorias |
| CT-02 | Selenium/Chrome | Abrir `/` e localizar `renderCanvas`, portal e botão do duelo | Jogo original permanece acessível |
| CT-03 | Selenium/Chrome | Abrir React e digitar `wasdERQ1234@example.com` | Campo aceita todos os caracteres, sem bloqueio de movimentação |
| CT-04 | Selenium/Chrome | Clicar em **Consultar API agora** no portal E6 | GET na Function Nhost responde e atualiza o ranking |
| CT-05 | Vitest | `npm test` | Testes de perguntas, lógica, interação e teclado passam |
| CT-06 | Node.js | `node --test tests/server/*.node.mjs` | Validação das regras de duelo e autorização passa |
| CT-07 | CI/CD | `npm run build` e checagem em `dist/ambientes/` | Vite compila e copia a apresentação para publicação |
| CT-08 | GitHub Pages | `scripts/check-pages-live.mjs` após deploy | Página de jogo e página E6 acessíveis, JS do Vite disponível |
| CT-09 | Backend público | `node scripts/smoke-cloud.mjs` | Ranking JSON válido, sem e-mails ou IDs privados |

## Como consultar evidências

Acesse [GitHub Actions](https://github.com/Ruan-levi/Entregavel6-Ambientes/actions). Abra o workflow **CONQUEST Entregável 6 - Testes Selenium (Chrome)**; no job de E2E, veja os casos passados ou com falha. Na seção **Artifacts**, procure `entregavel6-evidencias-selenium`: capturas da página, do jogo, do formulário e do ranking, caso o navegador tenha iniciado.

O workflow de publicação [CONQUEST Entregável 6 - Nhost e GitHub Pages](../.github/workflows/pages.yml) continua responsável pela build, publicação e verificação do Pages. Os testes automatizados Selenium **não criam usuários reais** nem expõem dados pessoais.

## Executar localmente

Terminal 1:

```bash
npm ci
npm run dev -- --host 127.0.0.1 --port 5173
```

Terminal 2:

```bash
python -m pip install -r e2e/requirements.txt
CONQUEST_TEST_BASE=http://127.0.0.1:5173 python -m unittest discover -s e2e/tests -p 'test_*.py' -v
```

No Windows PowerShell:

```powershell
$env:CONQUEST_TEST_BASE = "http://127.0.0.1:5173"
python -m unittest discover -s e2e/tests -p "test_*.py" -v
```

Se o Chrome não estiver disponível, instale o navegador ou ajuste o PATH. O Selenium Manager pode instalar o driver correspondente; durante a execução no GitHub Actions, a Action `browser-actions/setup-chrome@v2` fornece Chrome e ChromeDriver.

## Interpretação

Uma execução verde do Selenium confirma somente os cenários acima. Ela **não prova** que todo jogo 3D foi concluído, que dois jogadores completaram uma disputa, nem que um cadastro com confirmação de e-mail foi efetivado. Esses cenários exigem testes manuais com contas fictícias autorizadas.

Sempre consulte o resultado real da execução. Em caso de falha do ambiente externo, registre a mensagem e reteste sem alterar dados de produção para “forçar” o sucesso.

**Caminhos locais:** em modo `npm run dev`, a página do diretório `public/` pode ser aberta explicitamente em `http://127.0.0.1:5173/ambientes/index.html`. No GitHub Pages publicado, o caminho legível é `/Entregavel6-Ambientes/ambientes/`. Os testes E2E usam o primeiro para evitar o fallback do Vite à raiz.

# Testes ponta a ponta — CONQUEST Entregável 6

O Selenium WebDriver com Chrome testa os seis ambientes, o jogo 3D, formulário React e consulta pública REST ao Nhost. Screenshots são preservadas nos artefatos da execução no GitHub Actions.

```bash
npm ci
npm run dev -- --host 127.0.0.1 --port 5173
# Em outro terminal:
python -m pip install -r e2e/requirements.txt
python -m unittest discover -s e2e/tests -p 'test_*.py' -v
```

Os testes de formulário não criam contas reais nem gravam dados pessoais.

# Commit Genius CLI

> **Bilingual / Bilingue**

A ferramenta **Commit Genius CLI** automatiza a geração de mensagens de commit seguindo o padrão [Conventional Commits](https://www.conventionalcommits.org/), com suporte a inglês e português.

---

## Índice / Table of Contents

* [Descrição / Description](#descrição--description)
* [Pré-requisitos / Prerequisites](#pré-requisitos--prerequisites)
* [Instalação / Installation](#instalação--installation)
* [Configuração / Configuration](#configuração--configuration)
* [Uso / Usage](#uso--usage)
* [Parâmetros de Linha de Comando / CLI Flags](#parâmetros-de-linha-de-comando--cli-flags)
* [Funcionamento Interno / How It Works](#funcionamento-interno--how-it-works)
* [Contribuições / Contributing](#contribuições--contributing)
* [Licença / License](#licença--license)

---

## Descrição / Description

**Commit Genius CLI** é uma ferramenta de linha de comando que:

* Analisa as mudanças já staged no Git (`git diff --cached`).
* Consulta um modelo de IA (OpenAI ou DeepSeek) para gerar uma mensagem de commit clara e objetiva.
* Apresenta a sugestão ao usuário em **PT-BR** ou **EN-US**.
* Permite ao usuário aprovar (`yes`/`sim`), regenerar, editar manualmente ou abortar o commit.

**Commit Genius CLI** aims to streamline your Git workflow by:

* Inspecting staged changes (`git diff --cached`).
* Querying an AI model (OpenAI or DeepSeek) for a Conventional Commits–compliant message.
* Presenting suggestions in **pt-br** or **en-us**.
* Letting you approve, regenerate, manually edit, or abort the commit.

---

## Pré-requisitos / Prerequisites

* **Node.js** ≥ 14
* **npm** ou **pnpm**
* Conta e API Key do **OpenAI** (ou serviço DeepSeek configurado)
* No `package.json` do CLI: `"type": "module"`

---

## Instalação / Installation

### Opção 1: Local (link de desenvolvimento)

```bash
git clone https://github.com/IsraelDev560/commit-gen
cd commit-gen
npm install
npm link              # disponibiliza o comando globalmente
```

Em outro projeto:

```bash
cd ../outro-projeto
npm link commit-gen
```

### Opção 2: Pacote público / Private Registry

```bash
npm install -g commit-gen
```

### Opção 3: Direto no projeto (sem link)

```bash
cd /caminho/para/projeto
npm install --save-dev path/to/commit-gen
# adicione no package.json:
# "scripts": { "commit": "commit-gen" }
npm run commit
```

---

## Configuração / Configuration

O CLI usa a variável de ambiente `OPENAI_API_KEY` para autenticar chamadas à API da OpenAI. Configure de uma destas formas:

1. **Export no shell**:

   ```bash
   export OPENAI_API_KEY="SEU_TOKEN"
   ```

2. **Arquivo `.env`** (recomendado):

   ```env
   OPENAI_API_KEY=SEU_TOKEN
   ```

   e instale `dotenv`:

   ```bash
   npm install dotenv
   ```

   O CLI já faz `import 'dotenv/config'` automaticamente.

---

## Uso / Usage

1. **Stagie suas mudanças**:

   ```bash
   git add .
   ```
2. **Execute o CLI**:

   ```bash
   commit-gen      # ou `npm run commit`
   ```
3. **Escolha o idioma** (`pt` ou `en`) na primeira execução.
4. **Aja conforme as opções** exibidas:

   * **yes/sim**: aceita e faz o commit.
   * **no/não**: aborta.
   * **regenerate/regenerar**: gera nova sugestão.
   * **edit/editar**: digita manualmente a mensagem.

---

## Parâmetros de Linha de Comando / CLI Flags

Atualmente, o CLI não possui flags especiais além de `--help`. Planejamentos futuros podem incluir:

* `--model [openai|deepseek]`
* `--lang [pt|en]`
* `--add` para auto-staging de arquivos não staged

---

## Funcionamento Interno / How It Works

1. **Coleta diff**: `git diff --cached`.
2. **Prompting**: formata prompt conforme idioma e diff.
3. **Chamada IA**: para OpenAI (`service/openai.js`) ou DeepSeek (`service/deepseek.js`).
4. **Exibe** mensagem sugerida e interage 🚀

---

## Contribuições / Contributing

1. Faça um *fork* do projeto.
2. Crie uma *branch*: `git checkout -b feat/nova-funcionalidade`.
3. Faça *commit* das mudanças: `git commit -m "feat: descrição da mudança"`.
4. *Push* para a branch: `git push origin feat/nova-funcionalidade`.
5. Abra um *Pull Request*.

---

## Licença / License

MIT © 2025 Israel Dev
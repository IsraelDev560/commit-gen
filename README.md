# Commit Genius CLI

> **Bilingual / Bilíngue**

A ferramenta **Commit Genius CLI** automatiza a geração de mensagens de commit no padrão [Conventional Commits](https://www.conventionalcommits.org/), com suporte a **português (PT-BR)** e **inglês (EN-US)**.

The **Commit Genius CLI** tool automates the generation of commit messages following the [Conventional Commits](https://www.conventionalcommits.org/) standard, supporting **Portuguese (PT-BR)** and **English (EN-US)**.

---

## Índice / Table of Contents

- [Descrição / Description](#descrição--description)
- [Pré-requisitos / Prerequisites](#pré-requisitos--prerequisites)
- [Instalação / Installation](#instalação--installation)
- [Configuração / Configuration](#configuração--configuration)
- [Uso / Usage](#uso--usage)
- [Parâmetros de Linha de Comando / CLI Flags](#parâmetros-de-linha-de-comando--cli-flags)
- [Funcionamento Interno / How It Works](#funcionamento-interno--how-it-works)
- [Contribuições / Contributing](#contribuições--contributing)
- [Licença / License](#licença--license)

---

## Descrição / Description

**PT-BR**: O **Commit Genius CLI** é uma ferramenta de linha de comando que:
- Analisa mudanças staged no Git (`git diff --cached`).
- Usa um modelo de IA (OpenAI ou DeepSeek) para criar mensagens de commit claras e objetivas.
- Exibe sugestões em **PT-BR** ou **EN-US**.
- Permite aprovar (`sim`), regenerar, editar manualmente ou cancelar o commit.

**EN-US**: The **Commit Genius CLI** is a command-line tool that:
- Inspects staged changes in Git (`git diff --cached`).
- Queries an AI model (OpenAI or DeepSeek) to generate clear, concise commit messages.
- Presents suggestions in **PT-BR** or **EN-US**.
- Allows you to approve (`yes`), regenerate, manually edit, or abort the commit.

---

## Pré-requisitos / Prerequisites

- **Node.js** ≥ 14
- **npm** ou **pnpm**
- Conta e chave API do **OpenAI** (ou serviço DeepSeek configurado)
- No `package.json` do CLI: `"type": "module"`

---

## Instalação / Installation

### Opção 1: Instalação Local (Link de Desenvolvimento) / Local Installation (Development Link)

**PT-BR**:
```bash
git clone https://github.com/IsraelDev560/commit-gen
cd commit-gen
npm install
npm link  # Disponibiliza o comando globalmente
```

Em outro projeto:
```bash
cd ../outro-projeto
npm link commit-gen
```

**EN-US**:
```bash
git clone https://github.com/IsraelDev560/commit-gen
cd commit-gen
npm install
npm link  # Makes the command globally available
```

In another project:
```bash
cd ../another-project
npm link commit-gen
```

### Opção 2: Pacote Público ou Registro Privado / Public Package or Private Registry

**PT-BR**:
```bash
npm install -g commit-gen
```

**EN-US**:
```bash
npm install -g commit-gen
```

### Opção 3: Instalação Direta no Projeto (Sem Link) / Direct Project Installation (No Link)

**PT-BR**:
```bash
cd /caminho/para/projeto
npm install --save-dev path/to/commit-gen
# Adicione ao package.json:
# "scripts": { "commit": "commit-gen" }
npm run commit
```

**EN-US**:
```bash
cd /path/to/project
npm install --save-dev path/to/commit-gen
# Add to package.json:
# "scripts": { "commit": "commit-gen" }
npm run commit
```

---

## Configuração / Configuration

**PT-BR**: O CLI usa a variável de ambiente `OPENAI_API_KEY` para autenticar chamadas à API da OpenAI. Configure de uma das formas abaixo:

1. **Export no shell**:
   ```bash
   export OPENAI_API_KEY="SEU_TOKEN"
   ```

2. **Arquivo `.env`** (recomendado):
   ```env
   OPENAI_API_KEY=SEU_TOKEN
   ```
   Instale o `dotenv`:
   ```bash
   npm install dotenv
   ```
   O CLI carrega `dotenv/config` automaticamente.

**EN-US**: The CLI uses the `OPENAI_API_KEY` environment variable to authenticate OpenAI API calls. Configure it in one of the following ways:

1. **Shell export**:
   ```bash
   export OPENAI_API_KEY="YOUR_TOKEN"
   ```

2. **`.env` file** (recommended):
   ```env
   OPENAI_API_KEY=YOUR_TOKEN
   ```
   Install `dotenv`:
   ```bash
   npm install dotenv
   ```
   The CLI automatically loads `dotenv/config`.

---

## Uso / Usage

**PT-BR**:
1. Stage suas mudanças:
   ```bash
   git add .
   ```
2. Execute o CLI:
   ```bash
   commit-gen
   ```
3. Escolha o idioma (`pt` ou `en`) na primeira execução.
4. Selecione o modelo (`openai` ou `deepseek`).
5. Interaja com as opções exibidas:
   - **sim**: Aceita e faz o commit.
   - **não**: Cancela o commit.
   - **regenerar**: Gera uma nova sugestão.
   - **editar**: Digita a mensagem manualmente.

**EN-US**:
1. Stage your changes:
   ```bash
   git add .
   ```
2. Run the CLI:
   ```bash
   commit-gen
   ```
3. Choose the language (`pt` or `en`) on first run.
4. Select the model (`openai` or `deepseek`).
5. Interact with the displayed options:
   - **yes**: Approves and commits.
   - **no**: Aborts the commit.
   - **regenerate**: Generates a new suggestion.
   - **edit**: Manually types the message.

---

## Parâmetros de Linha de Comando / CLI Flags

**PT-BR**: Futuras implementações podem incluir:
- `--model [openai|deepseek]`: Escolhe o modelo de IA.
- `--lang [pt|en]`: Define o idioma.
- `--add`: Realiza auto-staging de arquivos.

**EN-US**: Future implementations may include:
- `--model [openai|deepseek]`: Selects the AI model.
- `--lang [pt|en]`: Sets the language.
- `--add`: Auto-stages files.

---

## Funcionamento Interno / How It Works

**PT-BR**:
1. Coleta o diff: `git diff --cached`.
2. Cria o prompt com base no idioma e no diff.
3. Chama a IA via `service/openai.js` ou `service/deepseek.js`.
4. Exibe a mensagem sugerida e aguarda interação.

**EN-US**:
1. Collects the diff: `git diff --cached`.
2. Formats the prompt based on language and diff.
3. Queries the AI via `service/openai.js` or `service/deepseek.js`.
4. Displays the suggested message and waits for interaction.

---

## Contribuições / Contributing

**PT-BR**:
1. Faça um *fork* do projeto.
2. Crie uma *branch*: `git checkout -b feat/nova-funcionalidade`.
3. Faça *commit* das mudanças: `git commit -m "feat: descrição da mudança"`.
4. Envie para a *branch*: `git push origin feat/nova-funcionalidade`.
5. Abra um *Pull Request*.

**EN-US**:
1. Fork the project.
2. Create a branch: `git checkout -b feat/new-feature`.
3. Commit your changes: `git commit -m "feat: change description"`.
4. Push to the branch: `git push origin feat/new-feature`.
5. Open a *Pull Request*.

---

## Licença / License

MIT © 2025 Israel Dev
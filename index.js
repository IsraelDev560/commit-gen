#!/usr/bin/env node
import { execSync } from 'child_process';
import { generateCommit } from './ai.js';
import PromptSync from 'prompt-sync';

const prompt = PromptSync();

function safePrompt(question) {
  const answer = prompt(question);
  return answer == null ? '' : answer.trim().toLowerCase();
}

const msgs = {
  en: {
    welcome: "🚀 Welcome to Commit Genius CLI!",
    chooseLang: "Choose language / Escolher idioma (en/pt): ",
    chooseModel: "Choose model AI (openai/deepseek): ",
    modelSelected: "Model Selected:",
    noDiff: "❌ No staged changes found.",
    addPrompt: "Do you want to run 'git add .'? (yes/no): ",
    commitSuggested: "💡 Commit suggested:",
    approve: "Do you approve? (yes/no/regenerate/edit): ",
    abort: "🚫 Commit aborted.",
    validOpts: "Valid options: yes, no, regenerate, edit",
    writeCommit: "✍️ Write your commit message: ",
    commitSuccess: "✅ Commit made!",
    commitFail: "❌ Failed to commit:",
    genError: "❌ Error generating commit:",
    unexpected: "❌ Unexpected error:",
    leaving: "Leaving..."
  },
  pt: {
    welcome: "🚀 Bem-vindo ao Commit Genius CLI!",
    chooseLang: "Escolha o idioma / Choose language (pt/en): ",
    chooseModel: "Escolha o modelo da IA (openai/deepseek): ",
    modelSelected: "Modelo Selecionado:",
    noDiff: "❌ Nenhuma alteração em staging encontrada.",
    addPrompt: "Deseja executar 'git add .'? (sim/não): ",
    commitSuggested: "💡 Commit sugerido:",
    approve: "Você aprova? (sim/não/regenerar/editar): ",
    abort: "🚫 Commit abortado.",
    validOpts: "Opções válidas: sim, não, regenerar, editar",
    writeCommit: "✍️ Escreva sua mensagem de commit: ",
    commitSuccess: "✅ Commit efetuado!",
    commitFail: "❌ Falha ao commitar:",
    genError: "❌ Erro ao gerar commit:",
    unexpected: "❌ Erro inesperado:",
    leaving: "Saindo..."
  }
};

async function doCommit(message, labels) {
  try {
    execSync(`git commit -m ${JSON.stringify(message)}`, { stdio: 'inherit' });
    console.log(labels.commitSuccess);
  } catch (err) {
    console.error(labels.commitFail, err.message);
    process.exit(1);
  }
}

async function runCommitGenius(diff, labels, lang, model) {
  try {
    let res = await generateCommit(diff, lang, model);
    while (true) {
      console.log(`\n${labels.commitSuggested}\n`, res, "\n");
      const answer = safePrompt(labels.approve);
      switch (answer) {
        case 'yes': case 'sim':
          await doCommit(res, labels);
          return;
        case 'no': case 'não':
          console.log(labels.abort);
          return;
        case 'regenerate': case 'regenerar':
          res = await generateCommit(diff, lang, model);
          break;
        case 'edit': case 'editar':
          const manual = prompt(labels.writeCommit) || '';
          await doCommit(manual.trim(), labels);
          return;
        default:
          console.log(labels.validOpts);
      }
    }
  } catch (err) {
    console.error(labels.genError, err.message);
    process.exit(1);
  }
}

async function main() {
  console.log(msgs.en.welcome);
  const langInput = safePrompt(msgs.en.chooseLang);
  const lang = langInput.startsWith('pt') ? 'pt' : 'en';
  const labels = msgs[lang];
  const modelInput = safePrompt(labels.chooseModel);
  const model = modelInput.startsWith('openai') ? 'openai' : 'deepseek';
  console.log(labels.modelSelected, model);
  try {
    const diff = execSync('git diff --cached').toString();
    if (!diff.trim()) {
      console.log(labels.noDiff);
      const ans = safePrompt(labels.addPrompt);
      if (ans === 'yes' || ans === 'sim') {
        execSync('git add .', { stdio: 'inherit' });
      } else {
        console.log(labels.leaving);
        process.exit(0);
      }
    }
    const latestDiff = execSync('git diff --cached').toString();
    await runCommitGenius(latestDiff, labels, lang, model);
  } catch (err) {
    console.error(labels.unexpected, err.message);
    process.exit(1);
  }
}

main();
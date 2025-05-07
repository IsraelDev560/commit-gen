#!/usr/bin/env node
import { execSync } from 'child_process';
import { generateCommit } from './ai.js';
import PromptSync from 'prompt-sync';

const prompt = PromptSync();

function doCommit(message) {
  try {
    execSync(`git commit -m ${JSON.stringify(message)}`, { stdio: 'inherit' });
    console.log("✅ Commit efetuado!");
  } catch (err) {
    console.error("❌ Falha ao commitar:", err.message);
    process.exit(1);
  }
}

async function runCommitGenius(diff) {
  try {
    let res = await generateCommit(diff);
    while (true) {
      console.log("\n💡 Commit sugerido:\n", res, "\n");
      const answer = prompt("Você aprova? (yes/no/regenerate/edit): ")
        .trim()
        .toLowerCase();

      switch (answer) {
        case 'yes':
          doCommit(res);
          return;

        case 'no':
          console.log('🚫 Commit abortado.');
          return;

        case 'regenerate':
          res = await generateCommit(diff);
          break;

        case 'edit':
          const manual = prompt("✍️ Escreva sua mensagem de commit: ").trim();
          doCommit(manual);
          return;

        default:
          console.log("Opções válidas: yes, no, regenerate, edit");
      }
    }
  } catch (err) {
    console.error("❌ Erro ao gerar commit:", err.message);
    process.exit(1);
  }
}

async function main() {
  try {
    const diff = execSync('git diff --cached').toString();

    if (!diff.trim()) {
      const ans = prompt("❌ Sem alterações staged. Deseja rodar 'git add .'? (yes/no): ")
        .trim()
        .toLowerCase();
      if (ans === 'yes') {
        execSync('git add .', { stdio: 'inherit' });
      } else {
        console.log("Saindo...");
        process.exit(0);
      }
    }

    await runCommitGenius(diff);
  } catch (err) {
    console.error("❌ Erro inesperado:", err.message);
    process.exit(1);
  }
}

main();
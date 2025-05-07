#!/usr/bin/env node
import { execSync } from 'child_process';
import { generateCommit } from './ai.js';
import PromptSync from 'prompt-sync';

const prompt = PromptSync();

function safePrompt(question) {
    const answer = prompt(question);
    return answer == null ? '' : answer.trim().toLowerCase();
  }

function doCommit(message) {
  try {
    execSync(`git commit -m ${JSON.stringify(message)}`, { stdio: 'inherit' });
    console.log("✅ Commit made!");
  } catch (err) {
    console.error("❌ Failed to commitar:", err.message);
    process.exit(1);
  }
}

async function runCommitGenius(diff) {
  try {
    let res = await generateCommit(diff);
    while (true) {
      console.log("\n💡 Commit suggested:\n", res, "\n");
      const answer = prompt("You approve? (yes/no/regenerate/edit): ")
        .trim()
        .toLowerCase();

      switch (answer) {
        case 'yes':
          doCommit(res);
          return;

        case 'no':
          console.log('🚫 Abort commit.');
          return;

        case 'regenerate':
          res = await generateCommit(diff);
          break;

        case 'edit':
          const manual = prompt("✍️ Write your commit message: ").trim();
          doCommit(manual);
          return;

        default:
          console.log("Valid options: yes, no, regenerate, edit");
      }
    }
  } catch (err) {
    console.error("❌ Error to generate commit:", err.message);
    process.exit(1);
  }
}

async function main() {
  try {
    const diff = execSync('git diff --cached').toString();

    if (!diff.trim()) {
      const ans = safePrompt("❌ No staged changes. Do you want to run 'git add .'? (yes/no): ")
        .trim()
        .toLowerCase();
      if (ans === 'yes') {
        execSync('git add .', { stdio: 'inherit' });
      } else {
        console.log("Leaving...");
        process.exit(0);
      }
    }

    await runCommitGenius(diff);
  } catch (err) {
    console.error("❌ Error unexpected:", err.message);
    process.exit(1);
  }
}

main();
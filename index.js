#!/usr/bin/env node
console.log("🚀 Welcome to Commit Genius CLI!");
import { execSync } from 'child_process';
import { generateCommit } from './ai.js';
import PromptSync from 'prompt-sync';

const diff = execSync('git diff --cached').toString();
const prompt = PromptSync();
if (!diff.trim()) {
    const question = prompt("❌ No staged changes found. You want git add ?(yes/no): ");
    if (question !== 'yes') {
        console.log("leaving...")
        process.emit(0)
    }
    execSync('git add .');
    await runCommitGenius();
}
else {
    runCommitGenius();
}

function questionUser() {
    const list = ['yes', 'no', 'regenerate', 'edit']
    const question = prompt("Do you proceed? ")
    const valid = list.includes(question)
    return { question, valid }
}

async function runCommitGenius() {
    let valid = false;
    let answer, res = await generateCommit(diff)
    do {
        ({ question: answer, valid } = questionUser())
        if (!valid) console.log("Opções válidas: yes, no, regenerate, edit")
    } while (!valid) {
        switch (answer) {
            case 'yes':
                execSync(`git commit -m '${res}'`).toString();
                console.log("Commit effetued!")
                valid = true;
                process.exit(0);
            case 'no':
                console.log('Aborting commit...');
                valid = true;
                process.exit(0);
            case 'regenerate':
                const regenerate = await generateCommit(diff);
                questionUser(valid)
            case 'edit':
                console.log("Please write you commit...");
                const manualCommit = prompt();
                execSync(`git commit -m '${manualCommit}'`).toString();
                console.log("Commit effetued!")
                valid = true;
                process.exit(0);
            default:
                console.log("Leaving...")
        }
    }
}
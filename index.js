#!/usr/bin/env node
console.log("🚀 Welcome to Commit Genius CLI!");
import { execSync } from 'child_process';
import { generateCommit } from './ai.js';
import PromptSync from 'prompt-sync';

const diff = execSync('git diff').toString();
const prompt = PromptSync();
if (!diff.trim()) console.log("❌ No staged changes found. Use 'git add' first."), process.exit(0);
else {
    const res = await generateCommit(diff)
    const question = prompt("Do you proceed?")
    if(question === 'yes'){
        execSync(`git add .; git commit ${res}`).toString();
    }
}
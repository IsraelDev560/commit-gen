#!/usr/bin/env node
console.log("🚀 Welcome to Commit Genius CLI!");
import { execSync } from 'child_process';
const diff = execSync('git diff').toString();
if (!diff.trim()) console.log("❌ No staged changes found. Use 'git add' first."), process.exit(0);
else console.log(diff)
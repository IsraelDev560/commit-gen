import { generateCommitDeepSeekAI } from "./service/deepseek.js";
import { generateCommitOpenAI } from "./service/openai.js";

export async function generateCommit(diff, model = 'openai') {
    if (model === 'deepseek') return await generateCommitDeepSeekAI(diff);
    else return await generateCommitOpenAI(diff);
}
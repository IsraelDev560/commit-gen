import { generateCommitDeepSeekAI } from "./service/deepseek.js";
import { generateCommitOpenAI } from "./service/openai.js";

export async function generateCommit(diff, lang, model = 'openai') {
    if (model === 'deepseek') return await generateCommitDeepSeekAI(diff, lang);
    else return await generateCommitOpenAI(diff, lang);
}
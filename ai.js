import { generateCommitDeepSeekAI } from "./service/deepseek";
import { generateCommitOpenAI } from "./service/openai";

export async function generateCommit(diff, model = 'openai') {
    if (model === 'deepseek') return await generateCommitDeepSeekAI(diff);
    else return await generateCommitOpenAI(diff);
}
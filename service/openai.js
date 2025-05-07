import { GPT_API_KEY } from "../API_KEY.js";

import OpenAI from "openai";

const openai = new OpenAI({
    // baseURL: 'https://chatgpt.com',
    apiKey: GPT_API_KEY
})

export async function generateCommitOpenAI(diff, lang) {
    const promptText = lang === 'pt'
    ? 'Você é um mago de versionamento. Gere uma mensagem de commit clara e objetiva baseada nas mudanças abaixo, seguindo o padrão Conventional Commits. Retorne apenas a linha de assunto:'
    : 'You are a versioning wizard. Generate a clear and objective commit message based on the changes below, following the Conventional Commits pattern. Return only the subject line:';
        diff;
    try {
        const res = await openai.chat.completions.create({
            messages: [{ role: 'system', content: `${promptText}\n\n${diff}` }],
            model: 'chatgpt-4o-latest'
        })

        return res.choices[0].message.content;
    } catch (error) {
        console.log("Ocorrued error: " + error);
    }
}
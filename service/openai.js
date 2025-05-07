import { GPT_API_KEY } from "../API_KEY.js";

import OpenAI from "openai";

const openai = new OpenAI({
    // baseURL: 'https://chatgpt.com',
    apiKey: GPT_API_KEY
})

export async function generateCommitOpenAI(diff) {
    const prompt =
        "Você é um assistente de versionamento. Gere uma mensagem de commit clara e objetiva com base nas alterações abaixo, seguindo o padrão Conventional Commits:\n\n" +
        diff;
    try {
        const res = await openai.chat.completions.create({
            messages: [{ role: 'system', content: prompt }],
            model: 'chatgpt-4o-latest'
        })

        console.log(res.choices[0].message.content)
    } catch (error) {
        console.log("Ocorrued error: " + error);
    }
}
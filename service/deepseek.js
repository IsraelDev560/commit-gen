import { DEEPSEEK_API_KEY } from "../API_KEY.js";
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com/v1',
    apiKey: DEEPSEEK_API_KEY
})

export async function generateCommitDeepSeekAI(diff) {
    const prompt =
    "Você é um assistente de versionamento. Gere uma mensagem de commit clara e objetiva com base nas alterações abaixo, seguindo o padrão Conventional Commits:\n\n" +
    diff;

    try {
        const res = await openai.chat.completions.create({
            messages: [{ role: 'system', content: prompt }],
            model: "deepseek-chat"
        })

        console.log(res.choices[0].message.content)
    } catch (error) {
        console.log("Ocorrued error: " + error);
    }
}
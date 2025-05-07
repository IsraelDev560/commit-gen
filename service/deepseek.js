import { DEEPSEEK_API_KEY } from "../API_KEY.js";
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com/v1',
    apiKey: DEEPSEEK_API_KEY
})

export async function generateCommitDeepSeekAI(diff, lang) {
    const promptText = lang === 'pt'
        ? 'Você é um mago de versionamento. Gere uma mensagem de commit clara baseada nas mudanças abaixo, seguindo o padrão Conventional Commits. Retorne apenas a linha de assunto:'
        : 'You are a versioning wizard. Generate a clear commit message based on the changes below, following the Conventional Commits pattern. Return only the subject line:';

    try {
        const res = await openai.chat.completions.create({
            messages: [{ role: 'system', content: `${promptText}\n\n${diff}` }],
            model: "deepseek-chat"
        })

        return res.choices[0].message.content;
    } catch (error) {
        console.log("Ocorrued error: " + error);
    }
}
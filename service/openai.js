import { GPT_API_KEY } from "../API_KEY.js";

import OpenAI from "openai";

const openai = new OpenAI({
    // baseURL: 'https://chatgpt.com',
    apiKey: GPT_API_KEY
})

export async function generateCommitOpenAI(diff) {
    const prompt =
        "You are a versioning wizard. Generate a clear and objective commit message based on the changes below, following the Conventional Commits pattern. Generate only the commit subject line, in Conventional Commits format, without additional text.:\n\n" +
        diff;
    try {
        const res = await openai.chat.completions.create({
            messages: [{ role: 'system', content: prompt }],
            model: 'chatgpt-4o-latest'
        })

        console.log(res.choices[0].message.content)
        return res.choices[0].message.content;
    } catch (error) {
        console.log("Ocorrued error: " + error);
    }
}
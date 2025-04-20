
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";
import { generatePrompt } from "../config/promp";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const run = async ( name: string, history: ChatCompletionMessageParam[]  ): Promise<string> => {

    const prompt = generatePrompt(name);

    // console.log({prompt});
    const resp = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: 'system', content: prompt },
            ...history
        ],
        temperature: 1,
        max_tokens: 800,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });

    return resp.choices[0].message.content ?? '';
}
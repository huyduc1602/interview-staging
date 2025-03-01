import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_CHATGPT_API_KEY,
    dangerouslyAllowBrowser: true  // Add this option for browser usage
});

export const chatWithGPT = async (prompt) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { 
                    role: "system", 
                    content: "You are a knowledgeable technical assistant. Provide clear, concise explanations with examples where appropriate." 
                },
                { 
                    role: "user", 
                    content: prompt 
                }
            ],
            model: "gpt-3.5-turbo",
            temperature: 0.7,
            max_tokens: 1000
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw new Error('Failed to generate response');
    }
};
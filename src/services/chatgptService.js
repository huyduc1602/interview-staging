import axios from "axios";

const CHATGPT_API_KEY = import.meta.env.VITE_CHATGPT_API_KEY;

export const fetchChatGPTAnswer = async (question) => {
    const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
            model: "gpt-4",
            messages: [{ role: "user", content: `Giải thích chi tiết: ${question}` }],
            max_tokens: 500,
        },
        {
            headers: { Authorization: `Bearer ${CHATGPT_API_KEY}` },
        }
    );
    return response.data.choices[0].message.content;
};

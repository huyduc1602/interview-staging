import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_CHATGPT_API_KEY,
    dangerouslyAllowBrowser: true  // Add this option for browser usage
});

const MODEL_CONFIG = {
  'gpt-3.5-turbo': {
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    max_tokens: 1000,
    price: 0.0022 // USD per request (approximate)
  },
  'gpt-4-turbo-preview': {
    model: 'gpt-4-turbo-preview',
    temperature: 0.7,
    max_tokens: 2000,
    price: 0.032 // USD per request (approximate)
  }
};

export const chatWithGPT = async (prompt, options = {}) => {
    const config = MODEL_CONFIG[options.modelType || 'gpt-3.5-turbo'];
    const language = options.language || 'en';

    const systemPrompts = {
        vi: `Bạn là một chuyên gia phỏng vấn kỹ thuật. PHẢI trả lời hoàn toàn bằng tiếng Việt.
Định dạng câu trả lời theo Markdown với:
- Giải thích rõ ràng bằng tiếng Việt
- Ví dụ thực tế
- Mã nguồn minh họa (nếu cần) với chú thích tiếng Việt
- Các phương pháp tốt nhất
- Những lỗi thường gặp cần tránh
- Phân tích độ phức tạp (nếu là thuật toán)

Quy tắc bắt buộc:
1. LUÔN trả lời bằng tiếng Việt
2. Sử dụng thuật ngữ kỹ thuật tiếng Việt, kèm tiếng Anh trong ngoặc
3. KHÔNG được trả lời bằng tiếng Anh
4. Nếu cần dùng từ tiếng Anh, phải có giải thích tiếng Việt`,

        en: `You are an expert technical interviewer. You MUST answer in English only.
Format your responses in Markdown with:
- Clear explanations in English
- Practical examples
- Code snippets where relevant
- Best practices
- Common pitfalls to avoid
- Complexity analysis (if algorithmic)

Strict rules:
1. ALWAYS answer in English
2. Use technical terms appropriately
3. NEVER respond in other languages
4. Maintain professional tone`
    };

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: systemPrompts[language]
                },
                {
                    role: "system",
                    content: language === 'vi' 
                        ? "Bạn PHẢI trả lời bằng tiếng Việt. Không được dùng tiếng Anh trừ khi là thuật ngữ kỹ thuật."
                        : "You MUST answer in English only. Never use other languages."
                },
                {
                    role: "user",
                    content: language === 'vi'
                        ? `Trả lời câu hỏi sau bằng tiếng Việt: ${prompt}`
                        : `Answer this question in English: ${prompt}`
                }
            ],
            model: config.model,
            temperature: config.temperature,
            max_tokens: config.max_tokens
        });

        return completion.choices[0].message.content;
    } catch (error) {
        if (error.status === 429) {
            throw new Error('API_RATE_LIMIT');
        }
        throw error;
    }
};
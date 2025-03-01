import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_SHEET_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
const SHEET_KNOWLEDGE = "Danh mục kiến thức";
const SHEET_QUESTIONS = "Câu hỏi phỏng vấn";

export const fetchGoogleSheetData = async () => {
    const knowledgeUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_KNOWLEDGE}?key=${API_KEY}`;
    const knowledgeResponse = await axios.get(knowledgeUrl);

    const rows = knowledgeResponse.data.values.slice(1); // Skip header row
    let currentCategory = null;
    const categorizedKnowledge = [];
    const knowledgeItems = {};

    rows.forEach((row, rowIndex) => {
        if (!row[0] && row[1]) {
            currentCategory = row[1];
            knowledgeItems[currentCategory] = [];
        } else if (row[0] && row[1] && currentCategory) {
            knowledgeItems[currentCategory].push({
                rowIndex: rowIndex + 2, // +2 because we skipped header and array is 0-based
                order: row[0],
                content: row[1],
                status: row[2] || 'Đang đợi',
                notes: row[3] || ''
            });
        }
    });

    Object.keys(knowledgeItems).forEach(category => {
        categorizedKnowledge.push({
            category,
            items: knowledgeItems[category]
        });
    });
    console.log('categorizedKnowledge', categorizedKnowledge);

    // Fetch questions and categories
    const questionsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_QUESTIONS}?key=${API_KEY}`;
    const questionsResponse = await axios.get(questionsUrl);
    const questionRows = questionsResponse.data.values.slice(1);

    let currentQuestionCategory = null;
    const categorizedQuestions = [];
    const questionItems = {};

    // First pass: collect categories and questions
    questionRows.forEach((row, index) => {
        // If first element has value, it's a new category
        if (row[0]) {
            currentQuestionCategory = row[0];
            if (!questionItems[currentQuestionCategory]) {
                questionItems[currentQuestionCategory] = [];
            }
        }

        // If row has a question (second element)
        if (row[1]) {
            questionItems[currentQuestionCategory].push({
                rowIndex: index + 2,
                question: row[1],
                answer: '',
                category: currentQuestionCategory
            });
        }
    });

    // Second pass: fetch answers from category sheets
    for (const category of Object.keys(questionItems)) {
        try {
            const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(category)}?key=${API_KEY}`;
            const answersResponse = await axios.get(sheetUrl);
            const answers = answersResponse.data.values || [];

            // Update questions with answers
            questionItems[category] = questionItems[category].map((item, index) => ({
                ...item,
                answer: answers[index] ? answers[index][0] : ''
            }));
        } catch (error) {
            console.error(`Failed to fetch answers for category ${category}:`, error);
        }
    }

    // Convert to array format
    Object.keys(questionItems).forEach(category => {
        categorizedQuestions.push({
            category,
            items: questionItems[category]
        });
    });

    return {
        knowledge: categorizedKnowledge,
        questions: categorizedQuestions
    };
};

export const updateKnowledgeStatus = async (rowIndex, status) => {
    const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_KNOWLEDGE}!C${rowIndex}?valueInputOption=RAW&key=${API_KEY}`;

    try {
        await axios.put(updateUrl, {
            values: [[status]]
        });
        return true;
    } catch (error) {
        console.error('Failed to update status:', error);
        return false;
    }
};
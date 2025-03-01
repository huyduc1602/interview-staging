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

    const questionsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_QUESTIONS}?key=${API_KEY}`;
    const questionsResponse = await axios.get(questionsUrl);
    const questionRows = questionsResponse.data.values.slice(1); // Skip header row
    const questions = questionRows.map((row, index) => ({
        rowIndex: index + 2,
        question: row[0],
        answer: row[1] || '',
        category: row[2] || ''
    }));

    return { knowledge: categorizedKnowledge, questions };
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
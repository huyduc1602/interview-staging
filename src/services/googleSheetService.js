import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_SHEET_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID; // Add this to .env.local
const SHEET_NAME = "Sheet1";

export const fetchGoogleSheetData = async () => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
    const response = await axios.get(url);
    return {
        knowledge: response.data.values[0].map(item => ({
            category: item,
            notes: ''
        })),
        questions: response.data.values.slice(1).map(item => ({
            question: item[0],
            answer: item[1] || ''
        }))
    };
};

import { createSlice } from '@reduxjs/toolkit';

const loadCachedAnswers = () => {
  try {
    const cached = localStorage.getItem('cachedAnswers');
    return cached ? JSON.parse(cached) : { en: {}, vi: {} };
  } catch (error) {
    console.error('Failed to load cached answers:', error);
    return { en: {}, vi: {} };
  }
};

const initialState = {
  knowledge: [],
  questions: [],
  answers: {},
  loading: false,
  error: null,
  cachedAnswers: loadCachedAnswers()
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    // Data fetching actions
    fetchDataRequest: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.knowledge = action.payload.knowledge;
      state.questions = action.payload.questions;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Answer handling actions
    fetchAnswerRequest: (state) => {
      state.loading = true;
    },
    fetchAnswerSuccess: (state, action) => {
      state.loading = false;
      const { question, category, answer } = action.payload;
      state.answers[`${category}-${question}`] = answer;
    },
    fetchAnswerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Knowledge status actions
    updateKnowledgeStatusRequest: (state) => {
      state.loading = true;
    },
    updateKnowledgeStatusSuccess: (state, action) => {
      state.loading = false;
      const { rowIndex, status } = action.payload;
      state.knowledge = state.knowledge.map(category => ({
        ...category,
        items: category.items.map(item =>
          item.rowIndex === rowIndex
            ? { ...item, status }
            : item
        )
      }));
    },
    updateKnowledgeStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setCachedAnswer: (state, action) => {
      const { language, questionId, answer, type = 'questions' } = action.payload;
      if (!state.cachedAnswers[language]) {
        state.cachedAnswers[language] = {};
      }
      if (!state.cachedAnswers[language][type]) {
        state.cachedAnswers[language][type] = {};
      }
      state.cachedAnswers[language][type][questionId] = answer;
      
      // Save to localStorage
      try {
        localStorage.setItem('cachedAnswers', JSON.stringify(state.cachedAnswers));
      } catch (error) {
        console.error('Failed to save cached answers:', error);
      }
    },
    clearCachedAnswers: (state) => {
      state.cachedAnswers = { en: {}, vi: {} };
      localStorage.removeItem('cachedAnswers');
    }
  },
});

export const {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  fetchAnswerRequest,
  fetchAnswerSuccess,
  fetchAnswerFailure,
  updateKnowledgeStatusRequest,
  updateKnowledgeStatusSuccess,
  updateKnowledgeStatusFailure,
  setCachedAnswer,
  clearCachedAnswers,
} = interviewSlice.actions;

export default interviewSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InterviewState {
  knowledge: any[];
  questions: any[];
  answers: { [key: string]: any };
  loading: boolean;
  error: null | any;
  cachedAnswers: {
    [language: string]: {
      [type: string]: {
        [questionId: string]: any;
      };
    };
  };
  [key: string]: any[] | any;
}

const loadCachedAnswers = () => {
  try {
    const cached = localStorage.getItem('cachedAnswers');
    return cached ? JSON.parse(cached) : { en: {}, vi: {} };
  } catch (error) {
    console.error('Failed to load cached answers:', error);
    return { en: {}, vi: {} };
  }
};

const initialState: InterviewState = {
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
      interface KnowledgeItem {
        rowIndex: number;
        status: string;
        [key: string]: any;
      }

      interface KnowledgeCategory {
        items: KnowledgeItem[];
        [key: string]: any;
      }

            state.knowledge = state.knowledge.map((category: KnowledgeCategory) => ({
              ...category,
              items: category.items.map((item: KnowledgeItem) =>
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
    },

    setItems: (state, action: PayloadAction<{ key: string; items: any[] }>) => {
      state[`${action.payload.key}`] = action.payload.items;
    },
    addItems: (state, action: PayloadAction<{ key: string; items: any[] }>) => {
      const currentItems = state[action.payload.key] || [];
      state[action.payload.key] = [
        ...currentItems,
        ...action.payload.items.filter(item => !currentItems.includes(item))
      ];
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
  setItems,
  addItems,
} = interviewSlice.actions;

export default interviewSlice.reducer;
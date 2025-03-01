import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  knowledge: [],
  questions: [],
  answers: {},
  loading: false,
  error: null,
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
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
    fetchAnswerRequest: (state) => {
      state.loading = true;
    },
    fetchAnswerSuccess: (state, action) => {
      state.loading = false;
      state.answers = {
        ...state.answers,
        [action.payload.question]: action.payload.answer,
      };
    },
    fetchAnswerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  fetchAnswerRequest,
  fetchAnswerSuccess,
  fetchAnswerFailure,
} = interviewSlice.actions;

export default interviewSlice.reducer;
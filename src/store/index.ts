import { configureStore } from '@reduxjs/toolkit';
import interviewReducer from '@/store/interview/slice';

const store = configureStore({
  reducer: {
    interview: interviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
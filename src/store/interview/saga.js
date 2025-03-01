import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchGoogleSheetData, updateKnowledgeStatus } from '../../services/googleSheetService';
import { fetchChatGPTAnswer } from '../../services/chatgptService';
import {
  fetchDataSuccess,
  fetchDataFailure,
  fetchAnswerSuccess,
  fetchAnswerFailure,
  updateKnowledgeStatusSuccess,
  updateKnowledgeStatusFailure,
} from './slice';

function* fetchDataSaga() {
  try {
    const data = yield call(fetchGoogleSheetData);
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

function* fetchAnswerSaga(action) {
  try {
    const answer = yield call(fetchChatGPTAnswer, action.payload);
    yield put(fetchAnswerSuccess({
      question: action.payload,
      answer,
    }));
  } catch (error) {
    yield put(fetchAnswerFailure(error.message));
  }
}

function* updateKnowledgeStatusSaga(action) {
  try {
    const { rowIndex, status } = action.payload;
    yield call(updateKnowledgeStatus, rowIndex, status);
    yield put(updateKnowledgeStatusSuccess({ rowIndex, status }));
  } catch (error) {
    yield put(updateKnowledgeStatusFailure(error.message));
  }
}

export function* interviewSaga() {
  yield takeLatest('interview/fetchDataRequest', fetchDataSaga);
  yield takeLatest('interview/fetchAnswerRequest', fetchAnswerSaga);
  yield takeLatest('interview/updateKnowledgeStatusRequest', updateKnowledgeStatusSaga);
}
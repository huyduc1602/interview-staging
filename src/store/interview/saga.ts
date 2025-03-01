import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchGoogleSheetData, updateKnowledgeStatus } from '@/services/googleSheetService';
import type { ApiResponse, SheetData } from '@/services/googleSheetService';
import { fetchChatGPTAnswer } from '@/services/chatgptService';
import {
    fetchDataRequest,
    fetchDataSuccess,
    fetchDataFailure,
    fetchAnswerRequest,
    fetchAnswerSuccess,
    fetchAnswerFailure,
    updateKnowledgeStatusRequest,
    updateKnowledgeStatusSuccess,
    updateKnowledgeStatusFailure,
} from './slice';

interface KnowledgeStatusPayload {
    rowIndex: number;
    status: string;
}

interface AnswerPayload {
    question: string;
    answer: string;
}

function* fetchDataSaga(): Generator<any, void, ApiResponse<SheetData>> {
    try {
        const response = yield call(fetchGoogleSheetData);
        if (response.success && response.data) {
            yield put(fetchDataSuccess(response.data));
        } else {
            throw new Error(response.error || 'Failed to fetch data');
        }
    } catch (error) {
        yield put(fetchDataFailure(
            error instanceof Error ? error.message : 'An unknown error occurred'
        ));
    }
}

function* fetchAnswerSaga(action: PayloadAction<string>): Generator<any, void, string> {
    try {
        const answer = yield call(fetchChatGPTAnswer, action.payload);
        yield put(fetchAnswerSuccess({
            question: action.payload,
            answer,
        } as AnswerPayload));
    } catch (error) {
        yield put(fetchAnswerFailure(
            error instanceof Error ? error.message : 'Failed to fetch answer'
        ));
    }
}

function* updateKnowledgeStatusSaga(
    action: PayloadAction<KnowledgeStatusPayload>
): Generator<any, void, boolean> {
    try {
        const { rowIndex, status } = action.payload;
        if (!rowIndex || !status) {
            throw new Error('Missing required parameters');
        }

        const success = yield call(updateKnowledgeStatus, rowIndex, status);
        if (success) {
            yield put(updateKnowledgeStatusSuccess(action.payload));
        } else {
            throw new Error('Failed to update status');
        }
    } catch (error) {
        yield put(updateKnowledgeStatusFailure(
            error instanceof Error ? error.message : 'Failed to update status'
        ));
    }
}

export function* interviewSaga() {
    yield takeLatest(fetchDataRequest.type, fetchDataSaga);
    yield takeLatest(fetchAnswerRequest.type, fetchAnswerSaga);
    yield takeLatest(updateKnowledgeStatusRequest.type, updateKnowledgeStatusSaga);
}
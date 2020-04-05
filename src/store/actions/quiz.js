import axios from "../../axios/axios-quiz";
import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_ANSWER_STATE,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY,
} from "./actionTypes";

export function fetchQuizes() {
    return async (dispatch) => {
        dispatch(fetchQuizesStart());
        try {
            const response = await axios.get("/quizes.json");
            const quizes = [];
            Object.keys(response.data).forEach((key) => {
                quizes.push({
                    id: key,
                    name: `Test of ${key}`,
                });
            });
            dispatch(fetchQuizesSuccess(quizes));
        } catch (error) {
            dispatch(fetchQuizesError(error));
        }
    };
}

export function fetchQuizById(quizId) {
    return async (dispatch) => {
        dispatch(fetchQuizesStart());
        try {
            const response = await axios.get(`/quizes/${quizId}.json`);
            const quiz = response.data;
            dispatch(fetchQuizSuccess(quiz));
        } catch (error) {
            fetchQuizSuccess(error);
        }
    };
}

export function fetchQuizSuccess(quiz) {
    return {
        quiz: quiz,
        type: FETCH_QUIZ_SUCCESS,
    };
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START,
    };
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes: quizes,
    };
}

export function fetchQuizesError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: error,
    };
}

export function quizSetAnswerState(answerState, results) {
    return {
        answerState,
        results,
        type: QUIZ_SET_ANSWER_STATE,
    };
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number,
    };
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ,
    };
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY,
    };
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz;
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === "success") {
                return;
            }
        }

        const question = state.quiz[state.activeQuestion];
        const results = state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = "success";
            }
            dispatch(quizSetAnswerState({ [answerId]: "success" }, results));

            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz());
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1));
                }

                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[question.id] = "error";
            dispatch(quizSetAnswerState({ [answerId]: "error" }, results));
            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz());
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1));
                }

                window.clearTimeout(timeout);
            }, 1000);
        }
    };
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length;
}

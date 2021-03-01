import {HYDRATE, createWrapper} from "next-redux-wrapper";
import todo from "./todo";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todo: todo.reducer,
});

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        if(state.count) nextState.count = state.count;
        return nextState;
    }
    return rootReducer(state, action);
}

// 스토어의 타입
export type RootState = ReturnType<typeof rootReducer>;

const initStore = () => {
    return configureStore({
        reducer,
        devTools: true,
    })
};

export const wrapper = createWrapper(initStore);
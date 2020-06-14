import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { wordsReducer } from "./reducers/words";
const store = createStore(combineReducers({ words: wordsReducer }));

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export { StoreProvider };

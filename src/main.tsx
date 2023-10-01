import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Root from './App.jsx'
import {combineReducers, createStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import usersReducer from "./features/users"
import errorReducer from "./features/error"
import otherStatesReducer from './features/otherStates'
import './index.css'

const rootReducer = combineReducers({users: usersReducer, errors: errorReducer, otherStates: otherStatesReducer})

export const store = createStore(rootReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Root />
    </Provider>,
)

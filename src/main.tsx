import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Root from './App.jsx'
import './index.css'
import {combineReducers, createStore} from "@reduxjs/toolkit";
import usersReducer from "./features/users"
import errorReducer from "./features/error"
import otherStatesReducer from './features/otherStates'
import {Provider} from "react-redux";


const rootReducer = combineReducers({users: usersReducer, errors: errorReducer, otherStates: otherStatesReducer})

export const store = createStore(rootReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Root />
    </Provider>,
)

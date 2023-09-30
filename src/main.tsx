import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Root from './App.jsx'
import './index.css'
import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "./features/errors.js"
import errorReducer from "./features/users"
import otherStatesReducer from './features/otherStates'
import {Provider} from "react-redux";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        errors: errorReducer,
        otherStates: otherStatesReducer
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Root />
    </Provider>,
)

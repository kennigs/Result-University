import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { productsReducer, userReducer } from './Reducers'
import { thunk } from "redux-thunk";

const reducer = combineReducers({
    userState: userReducer,
    productsState: productsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
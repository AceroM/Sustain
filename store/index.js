import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import recommended from './recommended';
const rootReducer = combineReducers({ recommended });
const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, middleware);
export default store;

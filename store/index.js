import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import recommended from './recommended'

const reducer = combineReducers({
  recommended
})

const store = configureStore({
  reducer,
})

export default store;
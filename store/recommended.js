import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'recommended',
  initialState: {
    categories: []
  },
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action)
    }
  },
});

export default slice.reducer
const { addCategory } = slice.actions
// export const addEditDeleteTodo = (todos) => async dispatch => {
//   try {
//     dispatch(addEditDeleteTodoSuccess(todos));
//   } catch (e) {
//     return console.error(e.message);
//   }
// }
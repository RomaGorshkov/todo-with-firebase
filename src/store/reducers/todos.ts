import { createSlice } from "@reduxjs/toolkit";
import type { Todo } from "../../types";
import { addTodo, fetchUserTodos } from "../slices/todosSlice";

interface TodoState {
  items: Todo[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  items: [],
  isLoading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch todos";
      })
      .addCase(addTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to add todo";
      });
  },
});

export const todosReducer = todoSlice.reducer;
